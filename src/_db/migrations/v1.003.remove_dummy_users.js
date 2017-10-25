import User from '../../users/models/model.user';

const removeDummyUsers = {
  name: 'v1.003.remove_dummy_users',
  up: removeUsers,
  down: () => Promise.resolve()
};

async function removeUsers() {
  await seekAndDestroy('__john@gmail.com');
  await seekAndDestroy('__fredrick@gmail.com');
}

async function seekAndDestroy(username) {
  await User
  .find({ username })
  .remove()
  .exec((err, data) => {
    if (err) throw new Error(err);
    console.log(`removed ${data.length}  users by the username ${username}`);
  });
}

export default removeDummyUsers;
