const AWS = require('aws-sdk');
const request = require('request');
const colors = require('colors');

// ================== global declarations ===================== //
const ec2 = new AWS.EC2({
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const nameTag = 'Name=Forest Index API Server';
const waitTime = 30000; // 30 sec
// ======================= functions ========================== //
function reboot() {
  return new Promise((resolve, reject) => {
    const params = {
      InstanceIds: [process.env.INSTANCE_IDS]
    };
    ec2.rebootInstances(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function waitTilDone() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return request(process.env.HEALTH_CHECK_URL, (err, res) => {
        if (err) {
          console.log(`${err}`.red, `waiting ${waitTime}...`.yellow);
          waitTilDone();
        } else {
          console.log(res.statusCode);
          if (res.statusCode !== 200) {
            console.log(`waiting ${waitTime}...`.yellow);
            waitTilDone();
          } else {
            resolve();
          }
        }
      });
    }, waitTime);
  });
}

// ========================= entry point ====================== //
(function start() {
  return Promise.resolve()
  .then(reboot)
  .then(waitTilDone)
  .then(() => {
    console.log(`update completed`.green);
  })
  .catch((err) => {
    console.log(`${err}`.red);
  });
})();
