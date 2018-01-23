import Service from '../../../services/models/model.service';
import services from '../data/services';

export default {
  name: '001.addState',
  up: addServices,
  down: () => Promise.resolve()
}

async function addServices() {
  const existingServices = await Service.find({});
  if (!existingServices || existingServices.length == 0) {
    for (let i = 0; i < services.length; i++) {
      const serviceToInsert = services[i];
      serviceToInsert.order = i;
      const service = new Service(serviceToInsert);
      service._id = i + 1;
      await service.save();
    }
  }
}
