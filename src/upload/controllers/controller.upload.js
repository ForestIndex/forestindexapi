import * as uploadService from '../library/service.upload';
import * as success from '../../common/responses/success';
import * as tokens from '../../common/library/tokens';
import Manager from '../../common/objects/manager';

export function uploadFile(req, res) {
    return Promise.resolve(Manager.init(req, res))
    .then(Manager.pass(tokens.authorize, 'req'))
    .then(Manager.handle(uploadService.uploadFile, 'req.body.image'))
    .then((m) => {
        return Promise.resolve(m);
    })
    .then(success.sendData)
    .catch((err) => { res.status(403).send(err); });
}

export function getFile(req, res) {
    return Promise.resolve(Manager.init(req, res))
    .then(Manager.handle(uploadService.getFile, 'req.params.name'))
    .then((m) => {
       const buff = m.data.Body;
       res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buff.length 
       });
       res.end(buff);
    })
    .catch(() => { res.status(404).send()});
}
