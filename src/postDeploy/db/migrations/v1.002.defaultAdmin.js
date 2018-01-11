import User from '../../../users/models/model.user';
import { createUser } from '../../../users/library/service.users';


const addDefaultAdmin = {
  name: 'v1.002.defaultAdmin',
  up: insertDefaultAdminIfNotExists,
  down: null
};

async function insertDefaultAdminIfNotExists() {
  const adminParams = { admin: true };
  const admins = await User.find(adminParams);
  if (!admins || admins.length < 1) {
    const defaultAdmin = {
      admin: true,
      username: 'admin',
      password: 'bacon123'
    };
    await createUser(defaultAdmin);
  }
}

export default addDefaultAdmin;
