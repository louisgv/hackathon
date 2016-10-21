import App from './App';
import Test from './Test';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import AccountSettings from './Account/Settings';
import ProfileSettings from './Account/Profile';
import PasswordSettings from './Account/Password';

const all = [];

export default function ({getState}) {
  const user = getState().app.currentUser;
  return {
    path: '/',
    component: App,
    indexRoute: {component: user ? Dashboard : Landing},
    getChildRoutes(_, cb) {
      if (user) {
        /* logged in routes */
        return cb(null, [
          ...all,
          {
            path: 'account',
            component: Account,
            childRoutes: [
              {path: 'settings', component: AccountSettings},
              {path: 'profile', component: ProfileSettings},
              {path: 'password', component: PasswordSettings}
            ]
          }
        ]);
      }
      /* logged out routes */
      cb(null, [
        ...all,
        {path: 'test', component: Test},
        {path: 'login', component: Login},
        {path: 'signup', component: Signup}
      ]);
    }
  };
}
