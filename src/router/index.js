import express from 'express';
import passport from 'passport';
import aws from 'aws-sdk';

import User from '../schemas/user';
import Invite from '../schemas/invite';

const router = express.Router();

function mustBeLoggedOut(req, res, next) {
  if (req.user && req.user._id) {
    return res.redirect('/');
  }
  next();
}

function mustBeLoggedIn(req, res, next) {
  if (!req.user || !req.user._id) {
    return res.redirect('/login');
  }
  next();
}

function mustBeAdmin(req, res, next) {
  if (!req.user.role === 'admin') {
    return res.redirect('/login');
  }
  next();
}

function allRoutes(req, res, next, markup = '') {
  res.render('app.ejs', {
    markup,
    css: '',
    classNames: '',
    is: JSON.stringify({
      app: {
        currentUser: req.user ? req.user._id : null,
        pendingLoads: {}
      },
      users: req.user ? { [req.user._id]: req.user } : {}
    })
  });
}

router.get('/', allRoutes);
router.get('/login', mustBeLoggedOut, allRoutes);
router.get('/signup', mustBeLoggedOut, allRoutes);
router.get('/admin*', mustBeLoggedIn, mustBeAdmin, allRoutes);
router.get('/dashboard', mustBeLoggedIn, allRoutes);
router.get('/invite', mustBeLoggedOut, allRoutes);
router.get('/invite/:id', mustBeLoggedOut, (req, res, next) => {
  next();
  Invite.findByIdAndUpdate(req.params.id, {viewed_on: Date.now()}).exec();
}, allRoutes);

function authenticate(req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err || !user) {
      res.statusMessage = 'Unable to log you in.<br/>Please check that your email and password are correct';
      return res.sendStatus(500);
    } else {
      req.logIn(user, function (err) {
        if (err) { return res.sendStatus(500); }
        return res.json(user);
      });
    }
  })(req, res, next);
}

router.post('/register', (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const newUser = new User({ first_name, last_name, email });

  User.register(newUser, password, function (err) {
    if (err) {
      if (err.errors) {
        err.message = Object.keys(err.errors).map(key => err.errors[key].message).join('<br/>');
      }
      res.statusMessage = err.message;
      return res.sendStatus(500);
    }

    authenticate(req, res, next);
  });
});

router.post('/login', authenticate);
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/sign-s3', (req, res) => {
  const S3_BUCKET = process.env.S3_BUCKET;
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;
