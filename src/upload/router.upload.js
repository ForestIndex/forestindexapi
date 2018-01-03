import * as controller from './controllers/controller.upload';

export default function(app) {
    app.post('/api/upload', controller.uploadFile);
    app.get('/api/images/:name', controller.serveFile)
}
