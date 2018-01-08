import AWS from 'aws-sdk';
import uuid from 'uuid/v1';
import { FileSystemCredentials } from 'aws-sdk/lib/credentials/file_system_credentials';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();

async function uploadFile(file) {
    if (!file.base64) {
        return Promise.reject('No base64 data included on a file upload request.');
    }

    return new Promise((res, rej) => {
        const buff = new Buffer(file.base64.replace(/^data:.*;base64,/, ""),'base64');
        const filename = uuid().toString();
        const params = {
            Bucket: process.env.S3_ATTACHMENTS_BUCKET,
            Key: filename,
            Body: buff,
            ContentEncoding: 'base64',
            ACL: 'private'
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                rej(err);
            } else {
                res(filename);
            }
        });
    });
}

export async function uploadFiles(fileArr) {
    if (fileArr.length < 1) {
        return Promise.reject('No files included on upload request.');
    }
    const resultingNamesArr = [];

    for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i];
        const name = await uploadFile(file);
        resultingNamesArr.push(name);
    }
    return Promise.resolve(resultingNamesArr);
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
