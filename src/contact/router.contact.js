import * as emailCtrl from './controllers/controller.email';

export default function(app) {
    app.post('/api/email', emailCtrl.postEmail);
}
