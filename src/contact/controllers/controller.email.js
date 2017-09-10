import * as emailService from '../library/service.email';

export function postEmail(req, res) {
    return Promise.resolve()
    .then(() => emailService.sendEmail(req.body))
    .then(() => res.status(200).send())
    .catch((err) => console.log(err));
}
