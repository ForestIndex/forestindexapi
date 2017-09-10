import County from '../models/model.county';

export function getCountiesByState(stateId) {
    const id = parseInt(stateId, 10);
    return County.find({ _state: id })
    .populate('_state');
}

export function getCounty(countyId) {
    const id = parseInt(countyId, 10);
    return County.find({ _id: id })
    .populate('_state');
}
