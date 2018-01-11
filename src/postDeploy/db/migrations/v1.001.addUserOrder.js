import User from '../../../users/models/model.user';

// Introducting User Order. No Users have orders, so we will default to alphabetical and then
// require order when saving new users. The order will then be adjusted by admins.

const addUserOrder = {
  name: 'v1.001.addUserOrder',
  up: addOrders,
  down: removeOrders
};


async function addOrders() {
  const users = await User.find({ admin: false })
  .sort('info.businessName');

  let nextOrderNum = 0;
  for (let i = 0; i < users.length; i++) {
    const update = {
      order: nextOrderNum
    };
    await User.findOneAndUpdate({ _id: users[i]._id }, update);
    const usr = await User.findOne({ _id: users[i]._id });
    nextOrderNum += 1;
  }

  const checkUsers = await User.find({ admin: false });
  const noOrders = checkUsers.filter((u) => {
    if (!u.order && typeof u.order != 'number') {
      return u;
    }
  });

  if (noOrders.length > 0) {
    return Promise.reject('Some users did not save properly');
  }
  return Promise.resolve();
}

async function removeOrders() {
  const users = await User.find({ admin: false });

  for (let i = 0; i < users.length; i++) {
    if (!!users[i].order || users[i].order === 0) delete users[i].order;
    await users[i].save();
  }

  const checkUSers = await User.find({ admin: false });
  const orders = checkUsers.filter((u) => u.order);

  if (orders.length > 0) {
    return Promise.reject('Some users did not roll back properly.');
  }
  return Promise.resolve();
}

export default addUserOrder;
