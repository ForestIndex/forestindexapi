import AWS from 'aws-sdk';
import colors from 'colors';
import fs from 'fs';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();

function uploadDefaultProfileImage() {
  const img = `${__dirname}/no-picture.png`;
  return new Promise((res, rej) => {
    fs.readFile(img, async (err, data) => {
      if (err) {
        rej(`${err}`.red);
      } else {
        const base64data = new Buffer(data, 'binary');
        const s3Params = {
          Bucket: process.env.S3_ATTACHMENTS_BUCKET,
          Body: base64data,
          Key: 'no-picture.png'
        };
        await s3.putObject(s3Params).promise();
        res();
      }
    });
  });
}

export default async function s3Agent() {
  return Promise.resolve()
  .then(uploadDefaultProfileImage)
  .catch((err) => {
    console.log(`${err}`.red);
  });
}
