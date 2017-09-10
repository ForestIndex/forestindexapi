import User from '../../users/models/model.user';

// Introducting User Order. No Users have orders, so we will default to alphabetical and then
// require order when saving new users. The order will then be adjusted by admins.

const addUserOrders = {
  up: addOrders,
  down: removeOrders
};


async function addOrders() {
  const users = await User.find({ admin: false })
  .sort('info.businessName');

  console.log(users);

}

async function removeOrders() {

}

export default addUserOrders;
