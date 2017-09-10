import fs from 'fs';
import checklist from './migration.checklist';
import * as migrations from './migrations';

const notRun = checklist.filter((mig) => !mig.run);

export default function() {
  console.log(notRun);
}
