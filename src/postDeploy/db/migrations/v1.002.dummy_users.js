import User from '../../../users/models/model.user';
import { createUser } from '../../../users/library/service.users';

// Adding dummy data for NODE_ENV=development
// all usernames begin with __
// should plan on preventing this prefix for form input

const insertDummyUsers = {
  name: 'v1.002.dummy_users',
  up: insertUsers,
  down: removeUsers
};

const users = [
  {
    username: "__fredrick@gmail.com",
    _service: 1,
    _category: 24,
    order: 6,
    info: {
      phone: "15557878899",
      description: "A really great Forestry business",
    address: {
      zip: 99387,
      state: {
        _id: 92,
        name: "Tennessee",
        abbreviation: "TN"
      },
      city: "Memphis",
      street: "154 Lincoln Ave"
    },
    operationalCounties: [
      2529,
      2531,
      2533
    ],
    businessName: "Fredrick's Forestry",
    images: []
    },
    active: true
  },
  {
    username: "__john@gmail.com",
    _service: 1,
    _category: 24,
    order: 9,
    info: {
      phone: "15557878899",
      description: "A really great Forestry business",
    address: {
      zip: 339998,
      state: {
        _id: 92,
        name: "Tennessee",
        abbreviation: "TN"
      },
      city: "Memphis",
      street: "998 Lincoln Ave"
    },
    operationalCounties: [
      2529,
      2531,
      2533
    ],
    businessName: "John's Forestry",
    images: [
      'forrestbusiness.jpg'
    ]
    },
    active: true
  },
  {
    admin: true,
    username: 'admin',
    password:  'bacon',
    active: true
  }
];

async function insertUsers() {
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve();
  } else {
    console.log('Inserting users for development');
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      await createUser(u);
      console.log(`inserted ${users[i].username}`);
    }
    return Promise.resolve();
  }
}

async function removeUsers() {
  for (let i = 0; i < users.length; i++) {
    await User.findOneAndRemove({ username: users[i].username });
  }
}

export default insertDummyUsers;
