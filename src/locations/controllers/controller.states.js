// import Manager from '../../common/objects/manager';
// import * as success from '../../common/responses/success';
import * as stateService from '../library/service.states';

export function getStates(req, res) {
    return Promise.resolve()
    .then(() => stateService.getStates())
    .then((states) => res.send(states))
    .catch(() => { res.status(500).send('There was an internal error.'); });
}

export function getState(req, res) {
    return Promise.resolve()
    .then(() => stateService.getState(req.params.id))
    .then((state) => { res.send(state); })
    .catch((err) => { res.status(404).send(err); });
}
