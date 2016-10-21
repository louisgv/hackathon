import Express from 'express';

import User from '../schemas/user';

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

export default router;
