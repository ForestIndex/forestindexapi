import Manager from '../../common/objects/manager';
// import * as success from '../../common/responses/success';
import * as errors from '../../common/responses/errors';
import * as service from '../library/service.auth';
import * as tokens from '../../common/library/tokens';

export function login(req, res) {
    return Promise.resolve()
    .then(() => Promise.resolve(req.body))
    .then(service.login)
    .then((id) => tokens.create(id))
    .then((tkn) => {
        // res.cookie(process.env.COOKIE_NAME, tkn, { httpOnly: false, maxAge: 86400 })
        res.send({ token: tkn });
    })
    .catch((err) => res.status(403).send(err));
}

// export function checkCredentials(req, res) {
//     return Promise.resolve(Manager.init(req, res))
//     .then(() => tokens.authorize(req.headers.authorization))
//     .then(() => res.sendStatus(200))
//     .catch((err) => res.status(403).send(err));
// }
