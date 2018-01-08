import fs from 'fs';

const checklistData = fs.readFileSync(`${__dirname}/migration.checklist.json`, 'utf-8');
const checklist = JSON.parse(JSON.parse(JSON.stringify(checklistData)));

export default function agent() {
  return Promise.resolve(checklist)
  .then(importMigrations)
  .then(executeMigrations)
  // .then(rollBackErrorMigrations)
  .catch((err) => {
    console.log(err);
  })
}

function importMigrations(checklistArr) {
  const migrations = [];
  for (let i = 0; i < checklistArr.length; i++) {
    const moduleLocation = `${__dirname}/migrations/${checklistArr[i].name}`;
    const mig = require(moduleLocation);
    mig._details = checklistArr[i];
    migrations.push(mig);
  }
  return Promise.resolve(migrations);
}

async function executeMigrations(migs) {
  const migrations = migs.filter((m) => !m._details.run);
  if (migrations.length > 0) {
    for (let i = 0; i < migrations.length; i++) {
      if (!migrations[i]._details.run) {
        migs[i]._details.run = true;
        migs[i]._details.success = true;
        await migrations[i].default.up();
      }
        migrations[i]._details.success = true;
        await updateChecklist(migrations[i]._details.name, true);
      }
      return Promise.resolve(migs);
    }
  return Promise.resolve(migs);
}


async function rollBackErrorMigrations(migs) {
  const migrations = migs.filter((m) => !m.success);
  if (migrations.length > 0) {
    for (let i = 0; i < migrations.length; i++) {
      await migrations[i].default.down();
      await updateChecklist(migrations[i]._details.name, false, null);
    }
    return Promise.resolve();
  }
  return Promise.resolve();
}

function updateChecklist(migrationName, run, success=true) {
  for (let i = 0; i < checklist.length; i++) {
    if (checklist[i].name === migrationName) {
      checklist[i].run = run;
      checklist[i].success = success;
      break;
    }
  }
  fs.writeFileSync(`${__dirname}/migration.checklist.json`, JSON.stringify(checklist, null, 2), 'utf-8');
}
