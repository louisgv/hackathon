import Express from 'express';

import User from '../schemas/user';
import Invite from '../schemas/invite';
import mail from '../utils/mail';
import invitation from '../utils/emails/invitation';

const router = Express.Router({mergeParams: true});

router.put('/user', (req, res) => {
  if (req.user && req.user._id) {
    delete req.body.admin;
    delete req.body.password;
    User.findByIdAndUpdate(req.user._id, req.body, {new: true}, (_, user) => {
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
  console.log(req.body);
  const newInvite = new Invite(req.body);
  newInvite.save();
  mail(newInvite.client_email, 'You have been invited to join us', invitation(newInvite._id));
  res.json(newInvite);
});

router.get('/invite/:id', (req, res) => {
  Invite.findById(req.params.id, (err, invite) => {
    if(err || !invite){
      return res.sendStatus(404);
    }

    res.json(invite);
  });
});

export default router;
