import bcrypt from 'bcryptjs';
import User from '../models/model.user';
import * as tools from '../../common/library/tools';

Array.prototype.matchVals = function(arr2) {
    const result = [];
    this.sort();
    arr2.sort();
    for (let i = 0; i < this.length; i++) {
        if (arr2.indexOf(this[i]) > -1) {
            result.push(this[i]);
        }
    }
    return result;
};

export async function getUsers() {
    const users = await User.find({ admin: false, active: true })
    .select('-password')
    .select('-admin')
    .populate('info.address.state')
    .populate('_service')
    .populate('_category', '-_service')
    .sort('order');
    return users;
}

export async function getUser(args) {
    const id = args[0];
    if (!id) return Promise.reject('Missing or invalid user id');
    const user = await User.find({ _id: id, admin: false })
    .select('-password')
    .select('-admin')
    .populate('_category', '-_service')
    .populate('_service')
    .populate('info.address.state')
    .populate('info.operationalCounties', 'name');
    if (!user) throw new Error('Error finding user');
    return user;
}

export async function getuserByUserName(name) {
    const user = await User.find({ username: name });
    return user;
}

export async function createUser(usr) {
    usr._id = await tools.getNextDbId();

    if (!usr.order) {
        const lastOrder = await User.findOne({ admin: false })
        .sort('-order');
        const next = lastOrder.order + 1;
        usr.order = next;
    }

    const user = new User(usr);
    await user.save();
    return user;
}

export async function nextUserId() {
    const user = await User.findOne({})
    .sort('-_id');
    const nextId = user._id + 1;
    return nextId;
}

export function shapeDataForSearch(criteria) {
    criteria.active = true;
    if (criteria.state) {
        criteria['info.address.state'] = criteria.state;
        delete criteria.state;
    }

    return Promise.resolve(criteria);
}

export function filterUsersCounties(users, counties=[]) {
    let filterResults = [];
    if (counties.length > 0) {
        filterResults = users.filter((u) => {
            let doesMatch = false;
            if (u.info && u.info.operationalCounties) {
                const matches =  counties.matchVals(u.info.operationalCounties);
                doesMatch = (matches.length > 0);
            }
            return doesMatch;
        });
    } else filterResults = users;

    return filterResults;
}

export function filterUsersCategories(users, categories=[]) {
    let filterResults = [];
    if (categories.length > 0) {
        filterResults = users.filter((u) => (categories.indexOf(u._category) > -1))
    } else filterResults = users;

    return filterResults;
}

export async function searchUsers(criteria) {
    const counties = (!!criteria.info && !!criteria.info.operationalCounties) ? criteria.info.operationalCounties : [];
    const categories = !!criteria.categories ? criteria.categories : [];

    if (criteria.info && criteria.info.operationalCounties) delete criteria.info.operationalCounties;
    if (criteria.info && Object.keys(criteria.info).length === 0) delete criteria.info;
    if (criteria.categories) delete criteria.categories;

    const unfiltered = await User.find(criteria)
    .sort('order');
    const filteredCounties = filterUsersCounties(unfiltered, counties);
    const filterCountyCat = filterUsersCategories(filteredCounties, categories);

    return Promise.resolve(filterCountyCat);
}

export async function updateUser(id, data) {
    if (data.password) {
        data.password = bcrypt.hashSync(data.password, 8);
    }
    await User.findOneAndUpdate({ _id: id }, { $set: data });
    const usr = await User.findById(id);

    if (!usr.admin) {
        return await User.findById(id)
        .populate('_service')
        .select('-password');
    } else {
        return await User.findById(id)
        .select('-info')
        .select('-password');
    }
}

export async function getAllUsers() {
    return await User.find({ admin: false })
    .populate('_service')
    .populate('_category')
    .populate('info.address.state')
    .populate('info.operationalCounties')
    .sort('order');
}

export async function getAdmins() {
    return await User.find({ admin: true })
    .select('-info');
}

// async function removeUser(id) {
//     await User.findByIdAndRemove(id);    
// }

export async function getUserBySubdomain(subdomain) {
    const params = {
        'hosting.subdomain': subdomain
    };
    const user = await User.findOne(params);
    
    if (!user || !user._id) {
        throw new Error('No user with specified subdomain');
    } else {
        return await User.findOne({ _id: user._id })
        .populate('_service')
        .populate('_category')
        .populate('info.address.state')
        .select('-password')
        .select('-admin');
    }
}
