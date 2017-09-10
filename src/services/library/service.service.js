import Service from '../models/model.service';
import Category from '../models/model.category';
import * as tools from '../../common/library/tools';

export async function getServices() {
    return await Service.find({})
    .sort('order');
}

export async function updateService(id, update) {
    if (!id) return Promise.reject();
    const target = await Service.findById(id);
    if (target.order !== update.order) {
        // update the existing service with the targetted order
        const search = await Service.find({ order: update.order });
        if (search.length > 1) throw new Error('Bad Data. More than one entry contains the same order number. Contact the DBA to correct this issue.');
        await Service.findOneAndUpdate({ _id: search[0]._id }, { order: target.order });
    }
    await Service.findOneAndUpdate({ _id: id}, { $set: update });
    return await Service.findById(id);
}

export async function deleteService(id) {
    if (!id) return Promise.reject();
    return await Service.findByIdAndRemove({ _id: id });
}

export async function nextServiceId() {
    const service = await Service.findOne({}).sort('-_id');
    const nextId = service._id + 1;
    return nextId;
}

export async function addService(service) {
    service._id = await tools.getNextDbId();
    const serv = new Service(service);
    await serv.save();
    return serv;
}

export async function validateEmptyService(id) {
    if (!id) return Promise.reject();
    const cats = await Category.find({ _service: id });
    return cats.length === 0;
}
