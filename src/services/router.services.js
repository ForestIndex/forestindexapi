import * as catController from './controllers/controller.categories';
import * as servController from './controllers/controller.services';

export default (app) => {
    app.get('/api/categories', catController.getCategories);
    app.post('/api/categories', catController.addCategory);
    app.put('/api/categories/:id', catController.updateCategory);
    app.delete('/api/categories/:id', catController.deleteCategory);

    app.get('/api/services', servController.getServices);
    app.put('/api/services/:id', servController.updateService);
    app.post('/api/services', servController.createService);
    app.delete('/api/services/:id', servController.deleteService);
}
