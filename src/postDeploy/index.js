import migrationAgent from './db/agent.v1';
import s3Agent from './s3/agent.v1';

export default async function postDeploy() {
  await migrationAgent();
  await s3Agent();
  console.log('POST DEPLOY COMPLETED');;
  return Promise.resolve();
}
