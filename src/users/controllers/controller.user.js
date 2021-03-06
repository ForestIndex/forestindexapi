import * as userService from '../library/service.users';
import * as errors from '../../common/responses/errors';
import * as success from '../../common/responses/success';
import * as tokens from '../../common/library/tokens';
import Manager from '../../common/objects/manager';

export function getAllUsers(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.headers.authorization))
    .then(() => userService.getAllUsers())
    .then((users) => res.send(users))
    .catch((err) => errors.forbidden(req, res, err));
}

export function getAdmins(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.headers.authorization))
    .then(() => userService.getAdmins())
    .then((admins) => res.send(admins))
    .catch((err) => errors.forbidden(req, res, err));
}

export function getUsers(req, res) {
    return Promise.resolve()
    .then(() => userService.getUsers())
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
}

export function getUser(req, res) {
    return Promise.resolve(req.params.id)
    .then(userService.getUser)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err));
}

export function createUser(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.headers.authorization))
    .then(() => userService.createUser(req.body))
    .then(() => res.status(204).send())
    .catch((err) => {
        console.log(err);
        res.status(403).send();
    })
}

export function updateUser(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.headers.authorization))
    .then(() => userService.updateUser(req.params.id, req.body))
    .then((usr) => res.send(usr))
    .catch(() => { res.status(403).send(); });
}

export function search(req, res) {
    return Promise.resolve()
    .then(() => userService.shapeDataForSearch(req.body))
    .then((criteria) => userService.searchUsers(criteria))
    .then((results) => res.send(results))
    .catch((err) => { res.status(500).send(err)});
}

export function gethostingData(req, res) {
    return Promise.resolve()
    .then(() => userService.getUserBySubdomain(req.params.subdomain))
    .then((data) => res.send(data))
    .catch((err) => {
        console.log(err);
        res.status(404).send(err);
    });
}

export function removeUserImage(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.headers.authorization))
    .then(() => userService.deleteUserImage(req.params.id, req.body.image))
    .then(() => res.status(204).send())
    .catch(() => res.status(500).send());
}
