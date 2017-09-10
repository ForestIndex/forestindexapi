import User from '../models/model.user';
import bcrypt from 'bcryptjs';

export async function login(creds) {
    if (creds.username && creds.password) {
        let found = await User.find({
            username: creds.username.toLowerCase(),
            active: true
        });
        if (found.length > 0) {
            const ok = await bcrypt.compare(creds.password, found[0].password);
            if (ok) {
                found = await User.find({ username: creds.username }).select('-password');
                return Promise.resolve(found[0]._id);
            }
            return Promise.reject('Incorrect credentials');
        }
    }
    return Promise.reject('User name and password required');
}
