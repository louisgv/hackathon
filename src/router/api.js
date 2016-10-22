import Express from 'express';

import User from '../schemas/user';
import Invite from '../schemas/invite';
import Client from '../schemas/client';
import mail from '../utils/mail';
import invitation from '../utils/emails/invitation';

const router = Express.Router({ mergeParams: true });

function admin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.sendStatus(500);
  }
  next();
}

router.put('/user', (req, res) => {
  if (req.user && req.user._id) {
    delete req.body.admin;
    delete req.body.password;
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (_, user) => {
      res.json(user);
    });
  }
});
router.put('/user/password', (req, res) => {
  User.findById(req.user._id, (_, user) => {
    user.authenticate(req.body.currentPassword, (err) => {
      if (!user || err) {
        return res.sendStatus(500);
      }
      user.setPassword(req.body.newPassword, (err, user) => {
        if (!user || err) {
          return res.sendStatus(500);
        }
        user.save();
        res.json(user);
      });
    });
  });
});

router.post('/invite', (req, res) => {
  const newInvite = new Invite(req.body);
  newInvite.save();
  mail(newInvite.client_email, 'You have been invited to join us', invitation(newInvite._id));
  res.json(newInvite);
});

router.get('/invite/:id', (req, res) => {
  Invite.findById(req.params.id, (err, invite) => {
    if (err || !invite) {
      return res.sendStatus(404);
    }

    res.json(invite);
  });
});

router.put('/invite/:id/accept', (req, res) => {
  Invite.findByIdAndUpdate(req.params.id, { accepted_on: Date.now() }, { new: true }, (err, invite) => {
    if (err || !invite) {
      return res.sendStatus(404);
    }
    const newClient = new Client({
      name: invite.client_name,
      email: invite.client_email,
      phone: invite.client_phone,
      invite: invite._id
    });
    newClient.save();
    res.json(invite);
  });
});

router.get('/client', (req, res) => {
  Client.find((req.user && req.user.role === 'client') ? { user: req.user._id } : {}, (_, clients) => {
    res.json(clients);
  });
});

router.get('/client/:id', (req, res) => {
  Client.findById(req.params.id, (_, client) => {
    if (req.user.role !== 'admin' && !client.user.equals(req.user._id)) {
      return res.sendStatus(404);
    }
    res.json(client);
  });
});

function generatePassword() {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

router.put('/client/:id', admin, (req, res) => {
  Client.findByIdAndUpdate(req.params.id, req.body, { new: true }, (_, client) => {
    res.json(client);

    if (req.body.status === 'approved') {
      const newUser = new User({ email: client.email, role: 'client' });
      const tempPassword = generatePassword();
      client.user = newUser._id;
      client.save();
      User.register(newUser, tempPassword, function (err) {
        if (err) {
          return res.sendStatus(500);
        }
        mail(
          client.email,
          'You have been accepted',
          `'you have been accepted! To track your shit go to localhost:5001/login. Youre temp
         password is ${tempPassword}`
        );
      });
    }
  });
});

router.post('/client/:id/note', admin, (req, res) => {
  Client.findById(req.params.id, (_, client) => {
    client.notes.push(req.body);
    client.save();
    res.json(client.notes);
  });
});

export default router;
