import migrationAgent from './db/agent';
import s3Agent from './s3/agent';

export default async function postDeploy() {
  await migrationAgent();
  await s3Agent();
  console.log('POST DEPLOY COMPLETED');;
  return Promise.resolve();
}
