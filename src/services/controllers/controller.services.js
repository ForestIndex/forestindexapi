import * as service from '../library/service.service';
import * as tokens from '../../common/library/tokens';

export function getServices(req, res) {
    return Promise.resolve()
    .then(() => service.getServices())
    .then((services) => res.send(services))
    .catch((err) => { res.status(500).send(err); });
}

export function updateService(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.cookies.forestryservices))
    .then(() => service.updateService(req.params.id, req.body))
    .then((service) => res.send(service))
    .catch((err) => {
        console.log(err);
        res.status(403).send(err);
    })
}

export function createService(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.cookies.forestryservices))
    .then(() => service.addService(req.body))
    .then((service) => res.send(service))
    .catch((err) => {
        console.log(err);
        res.status(403).send(err);
    })
}

export function deleteService(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.cookies.forestryservices))
    .then(() => service.validateEmptyService(req.params.id))
    .then((ok) => {
        if (ok) {
            return service.deleteService(req.params.id);
        } else {
            res.status(400).send('Cannot delete service. This service has dependent categories. Remove or edit the categories to be dependent on another service before deleting this one.')
        }
    })
    .then(() => res.status(200).send())
    .catch((err) => {
        console.log(err);
        res.status(403).send();
    })
}
