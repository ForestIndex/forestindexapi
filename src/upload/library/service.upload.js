import AWS from 'aws-sdk';
import uuid from 'uuid/v1';
import config from '../../config';

AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey
});

const s3 = new AWS.S3();

export async function uploadFile(base64DataArr) {
    const base64Data = base64DataArr[0];
    const buff = new Buffer(base64Data.replace(/^data:.*;base64,/, ""),'base64');
    const filename = uuid().toString();
    const params = {
        Bucket: 'forest-index',
        Key: filename,
        Body: buff,
        ContentEncoding: 'base64',
        ACL: 'public-read'
    };

    await s3.upload(params, handleUrlData);
    return filename;
}

function handleUrlData(err, data) {
    if (err) return Promise.reject(err);
    return Promise.resolve(data);
}

export function getFile(fileName) {
    const params = {
        Bucket: 'forest-index',
        Key: fileName[0]
    };

    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
