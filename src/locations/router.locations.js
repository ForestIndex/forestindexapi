import * as stateController from './controllers/controller.states';
import * as countyController from './controllers/controller.county';

export default function(app) {
    app.get('/api/states', stateController.getStates);
    app.get('/api/states/:id/counties', countyController.getCountiesByState);
    app.get('/api/counties/:id', countyController.getCounty);
}
