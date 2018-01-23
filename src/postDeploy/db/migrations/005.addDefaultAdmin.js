import bcrypt from 'bcryptjs';
import User from '../../../users/models/model.user';
import admin from '../data/defaultAdmin';

export default {
  name: '005.addDefaultAdmin',
  up: addDefaultAdmin,
  down: () => Promise.resolve
}

async function addDefaultAdmin() {
  const existingAdmin = await User.findOne({ admin: true });
  const latestUser = User.findOne().sort('-_id');
  if (!existingAdmin || !existingAdmin._id) {
    const id = (!!latestUser && !!latestUser._id) ? latestUser._id + 1 : 1;
    admin._id = id;
    admin.password = bcrypt.hashSync(admin.password, 8);
    const newAdmin = new User(admin);
    await newAdmin.save();
  }
}
