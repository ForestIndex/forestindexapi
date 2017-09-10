import * as tools from '../../common/library/tools';
import Category from '../models/model.category';
import User from '../../users/models/model.user';

export async function getCategories() {
    return Category.find({})
    // .populate('_service')
    .sort('name');
}

export async function validateNoUsers(id) {
    const params = { _category: id };
    const users = await User.find(params);
    return users.length === 0;
}

export async function updateCategory(id, update) {
    if (!id) return Promise.reject();
    await Category.findByIdAndUpdate({ _id: id }, update);
    return await Category.findById(id);
}

export async function addCategory(category) {
    const id = await tools.getNextDbId();
    category._id = id;
    const cat = new Category(category);
    await cat.save();
    return await Category.findById(id);
}

export async function deleteCategory(id) {
    if (!id) return Promise.reject();
    return await Category.findByIdAndRemove({ _id: id });
}

export async function nextCategoryId() {
    const cat = await Category.findOne({})
    .sort('-_id');
    const nextId = cat._id + 1;
    return nextId;
}
