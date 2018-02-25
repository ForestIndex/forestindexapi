import jwt from 'jsonwebtoken';
// import userService from '../../users/library/service.users';
import User from '../../users/models/model.user';

export function create(userId) {
    const sevenDays = 60 * 60 * 24 * 7;
    // store user id and expiration
    const obj = { jwtid: userId, expiresIn: sevenDays };
    const token = jwt.sign(obj, process.env.SECRET);

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
    const data = await jwt.verify(token, process.env.SECRET);
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

export async function authorize(token) {
    if (!token) {
        return Promise.reject('No token provided. Not authorized.');
    }

    const parsedToken = token.replace(`${process.env.COOKIE_NAME}=`, '');
    if (process.env.DEBUG && process.env.DEBUG === 'true') {
        console.log(`
            Checking token: ${parsedToken}
        `);
        console.log(parsedToken);
    }
    const data = jwt.verify(parsedToken, process.env.SECRET);
    if (process.env.DEBUG === 'true') console.log(data);

    if (!data || !data.jwtid) {
        return Promise.reject('Unauthoried.');
    }

    let criteria = { _id: data.jwtid };
    const userResult = await User.findOne(criteria);

    if (!!userResult && !!userResult._id) {
        return Promise.resolve();
    }
    return Promise.reject('Invalid web token. User not found.');
}
