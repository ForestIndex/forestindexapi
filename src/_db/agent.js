import fs from 'fs';

const checklistData = fs.readFileSync(`${__dirname}/migration.checklist.json`, 'utf-8');
const checklist = JSON.parse(JSON.parse(JSON.stringify(checklistData)));
const notRun = checklist.filter((mig) => !mig.run);

export default function() {
  return Promise.resolve(notRun)
  .then(importMigrations)
  .then(executeMigrations)
  .catch((err) => {
    console.log(err);
  })
  // .catch(rollBackMigrations);
}

function importMigrations(checklistArr) {
  const migrations = [];
  for (let i = 0; i < checklistArr.length; i++) {
    const moduleLocation = `${__dirname}/migrations/${checklistArr[i].name}`;
    const mig = require(moduleLocation);
    migrations.push(mig);
  }
  return Promise.resolve(migrations);
}

async function executeMigrations(migrations) {
  if (migrations.length > 0) {
    for (let i = 0; i < migrations.length; i++) {
      await migrations[i].default.up();
      updateChecklist(migrations[i].default.name, true);
    }
  }
}

async function rollBackMigrations(err) {
  console.log(err);
  return Promise.resolve(notRun)
  .then(importMigrations)
  .then(async (migrations) => {
    if (migrations.length > 0) {
      for (let i = 0; i < migrations.length; i++) {
        await migrations[i].default.down();
        updateChecklist(migrations[i].default.name, true);
      }
    }
  })
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
