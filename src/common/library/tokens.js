import jwt from 'jsonwebtoken';
// import userService from '../../users/library/service.users';
import User from '../../users/models/model.user';
import config from '../../config';

export function create(userId) {
    const sevenDays = 60 * 60 * 24 * 7;
    // store user id and expiration
    const obj = { jwtid: userId, expiresIn: sevenDays };
    const token = jwt.sign(obj, config.secret);

    return Promise.resolve(token);
}

function extractCookie(req) {
    const tokenStringArr = req[0].headers['cookie'].split(' ');
    const idx = tokenStringArr.length - 1;
    const tokenString = tokenStringArr[idx];
    const token = tokenString.replace('forestryservices=', '');
    return Promise.resolve(token);
}

// with /:id... only users can update themselves- admins anyone
export async function authorizeWithParams(req) {
    const token = await extractCookie(req);
    const data = await jwt.verify(token, config.secret);
    const userResult = await User.find({ _id: data.jwtid });
    const user = userResult[0];

    // 2: admin, 1: user, 0: unauthorized
    if (user.admin) {
        return Promise.resolve(2);
    } else if (user.length > 0) {
        const id = parseInt(req.params.id.toString(), 10);
        // nonadmins can only update themselves
        if (id === user._id) {
            return Promise.resolve(1);
        }
        return Promise.reject(0, 'unauthorized');
    }
    return Promise.reject('Invalid token');
}

export async function authorize(token, authLevel) {
    if (!token) {
        return Promise.reject('No token provided. Not authorized.');
    }
    const data = await jwt.verify(token, config.secret);
    let criteria = { _id: data.jwtid };
    if (authLevel && authLevel > 0) {
        criteria.admin = true;
    }
    const userResult = await User.find(criteria);

    if (userResult.length > 0) {
        return Promise.resolve();
    }
    return Promise.reject('Invalid web token');
}
