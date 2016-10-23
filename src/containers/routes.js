import Admin from './Admin';
import App from './App';
import ClientList from './Admin/ClientList';
import ClientManager from './Admin/ClientManager';
import Dashboard from './Dashboard';
import Invite from './Invite';
import InviteInfo from './IniviteInfo';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';

const all = [];

export default function ({ getState }) {
  const user = getState().users[getState().app.currentUser];
  return {
    path: '/',
    component: App,
    indexRoute: { component: user && !(user.role === 'admin') ? Dashboard : Landing },
    getChildRoutes(_, cb) {
      if (user) {
        if (user.role === 'admin') {
          return cb(null, [
            ...all,
            {
              path: 'admin',
              component: Admin,
              indexRoute: { component: ClientList },
              childRoutes: [
                { path: 'client/:id', component: ClientManager }
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
