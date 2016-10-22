import Admin from './Admin';
import App from './App';
import ClientManager from './Admin/ClientManager';
import Invite from './Invite';
import InviteInfo from './IniviteInfo';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';

const all = [];

export default function ({ getState }) {
  const user = getState().app.currentUser;
  return {
    path: '/',
    component: App,
    indexRoute: { component: Landing },
    getChildRoutes(_, cb) {
      if (user) {
        if (user.role === 'admin') {
          return cb(null, [
            ...all,
            {
              path: 'admin',
              component: Admin,
              childRoutes: [
                { path: 'client/:client_id', component: ClientManager }
              ]
            }
          ]);
        }
      }
      /* logged out routes */
      cb(null, [
        ...all,
        { path: 'invite', component: Invite },
        { path: 'invite/:invite_id', component: InviteInfo },
        { path: 'login', component: Login },
        { path: 'signup', component: Signup }
      ]);
    }
  };
}
