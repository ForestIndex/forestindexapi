// import Manager from '../../common/objects/manager';
import * as service from '../library/service.counties';
// import * as success from '../../common/responses/success';

export function getCountiesByState(req, res) {
    return Promise.resolve()
    .then(() => service.getCountiesByState(req.params.id))
    .then((counties) => res.send(counties))
    .catch((err) => { res.status(500).send(err); });
}

export function getCounty(req, res) {
    return Promise.resolve()
    .then(() => service.getCounty(req.params.id))
    .then((county) => res.send(county))
    .catch((err) => { res.status(404).send(err); });
}
