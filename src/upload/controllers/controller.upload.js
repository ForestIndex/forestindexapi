import { uploadFiles, getFile } from '../library/service.upload';
import * as success from '../../common/responses/success';
import * as tokens from '../../common/library/tokens';
import Manager from '../../common/objects/manager';

export function uploadFile(req, res) {
    return Promise.resolve(req)
    .then(() => tokens.authorize(req.cookies.forestryservices))
    .then(() => Promise.resolve(req.body))
    .then(uploadFiles)
    .then((data) => res.send(data))
    .catch((err) => res.status(403).send(err));
}

export function serveFile(req, res) {
    return Promise.resolve(Manager.init(req, res))
    .then(Manager.handle(getFile, 'req.params.name'))
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
