import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import uuid from 'uuid/v4';
import cls from 'continuation-local-storage';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
// this lib is used without explicitly calling 'colors'
// eslint-disable-next-line
import colors from 'colors';

// database migrations
import postDeploy from './postDeploy';

// import app modules
import registerUserRouter from './users/router.users';
import registerServiceRouter from './services/router.services';
import registerLocationRouter from './locations/router.locations';
import registerUploadRouter from './upload/router.upload';
import registerContactRouter from './contact/router.contact';

// middleware
import cors from './middleware/cors';

const envFile = process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env';
dotenv.config({ path: `${__dirname}/${envFile}` });
console.log(process.env.DB);

// should not set this to a variable if possible
const nameSpace = cls.createNamespace('com.forestindex');

const port = process.env.PORT || 8080;

// set app
const app = express();
app.use(bodyParser.json({ limit: '1000kb' }));
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(transactions);

// call back functions
(function db() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB);
    mongoose.connection.once('connected', startUp);
    const env = process.env.NODE_ENV || 'development';
    console.log(`connected to ${env} DB`.dim);
})();

function startUp() {
    // check for new migrations
    return Promise.resolve()
    .then(postDeploy)
    .then(() => {
        registerUserRouter(app);
        registerServiceRouter(app);
        registerLocationRouter(app);
        registerUploadRouter(app);
        registerContactRouter(app);
        console.log(`Forest Index API running on port ${port}`.cyan);
    });
}

function transactions(req, res, next) {
    const namespace = cls.getNamespace('com.forestindex');
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);

    nameSpace.run(setTid);

    function setTid() {
        namespace.set('tid', uuid());
        next();
    }
}

app.get('/api/status', (req, res) => {
    res.send({
        server: 'Forest Index',
        status: `${process.env.NODE_ENV} environment online`,
        last_reboot: process.env.REBOOT_TIME
    });
});


process.on('unhandledRejection', (rej, prom) => {
    console.log(`Unhandled Rejection: ${rej} happened in promise: ${prom}`);
    console.log(prom);
});

// ----------- entry point ----------- //
if (process.env.NODE_ENV === 'production') {
    const privKeyFile = fs.readFileSync(`${__dirname}/key.pem`);
    const certFile = fs.readFileSync(`${__dirname}/cert.pem`);

    https.createServer({
        key: privKeyFile,
        cert: certFile
    }, app)
    .listen(port);

} else {
    app.listen(port, () => {
        console.log('DEV');
    });
}
