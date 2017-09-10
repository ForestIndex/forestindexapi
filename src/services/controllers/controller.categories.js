import * as catService from '../library/service.categories';
import * as tokens from '../../common/library/tokens';

export function getCategories(req, res) {
    return Promise.resolve()
    .then(() => catService.getCategories())
    .then((categories) => res.send(categories))
    .catch((err) => { res.status(500).send(err); });
}

export function deleteCategory(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.query.token))
    .then(() => catService.validateNoUsers(req.params.id))
    .then((ok) => {
        if (ok) {
            return catService.deleteCategory(req.params.id);
        } else {
            res.status(400).send('Cannot delete category. There are currently business users that are dependent to this category. Remove or edit the users to be dependent on another category before deleting this one.')
        }
    })
    .then(() => res.status(200).send())
    .catch((err) => {
        console.log(err);
        res.status(403).send(err);
    })
}

export function addCategory(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.query.token))
    .then(() => catService.addCategory(req.body))
    .then((cat) => res.send(cat))
    .catch((err) => {
        console.log(err);
        res.status(403).send();
    })
}

export function updateCategory(req, res) {
    return Promise.resolve()
    .then(() => tokens.authorize(req.query.token))
    .then(() => catService.updateCategory(req.params.id, req.body))
    .then((category) => res.send(category))
    .catch((err) => {
        console.log(err);
        res.status(403).send(err);
    })
}
