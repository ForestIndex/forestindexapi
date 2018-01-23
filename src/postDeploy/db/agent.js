import fs from 'fs';
import Migration from './migration.model';

const migrationsFolder = process.env.MIGRATIONS_FOLDER_PATH || `${__dirname}/migrations`;

export default async function agent() {
  const migrations = fs.readdirSync(migrationsFolder);
  for (let i = 0; i < migrations.length; i++) {
    const migFile = migrations[i];
    const module = require(`${migrationsFolder}/${migFile}`).default;
    const isFunction = typeof module.up === 'function';
    const migName = migFile.replace('.js', '');
    const m = await Migration.findOne({ name: migName });
    if (!m && !!module.up && isFunction) {
      const id = Math.round(Math.random() * 999999999);
      await module.up();
      const update = new Migration({ name: migName, _id: id });
      await update.save();
    }
  }
}
