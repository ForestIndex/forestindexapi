import User from '../models/model.user';
import bcrypt from 'bcryptjs';

export async function login(creds) {
    if (creds.username && creds.password) {
        let found = await User.findOne({
            username: creds.username.toLowerCase()
            // active: true
        });
        if (!!found) {
            const ok = await bcrypt.compare(creds.password, found.password);
            if (!!ok) {
                const matchedValidUser = await User.findOne({ username: creds.username }).select('-password');
                return Promise.resolve(matchedValidUser._id);
            }
            return Promise.reject('Incorrect credentials');
        }
    }
    return Promise.reject('User name and password required');
}
