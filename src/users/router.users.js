import * as controller from './controllers/controller.user';
import * as authController from './controllers/controller.auth';

export default function(app) {
    // authorization
    app.post('/api/login', authController.login);
    app.post('/api/auth', authController.checkCredentials);

    // standard user routes
    app.get('/api/users', controller.getUsers);
    app.get('/api/users/:id', controller.getUser);
    app.post('/api/users/search', controller.search);
    app.get('/api/hosting/:subdomain', controller.gethostingData);

    // admin routes
    app.get('/api/allusers', controller.getAllUsers);
    app.get('/api/admins', controller.getAdmins);
    app.post('/api/users', controller.createUser);
    app.post('/api/users/:id', controller.updateUser);
}
