import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import uuid from 'uuid/v4';
import cls from 'continuation-local-storage';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
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

const envFile = process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env';
dotenv.config({ path: `${__dirname}/${envFile}` });

// should not set this to a variable if possible
const nameSpace = cls.createNamespace('com.forestindex');

const port = process.env.PORT || 8080;

const corsConfig = {
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization,Access-Control-Allow-Credentials',
    origin: (origin, callback) => {
        // const whiteList = [
        //     process.env.ADMIN_SAFE_ORIGIN,
        //     process.env.PUBLIC_SAFE_ORIGIN
        // ];
        // if (whiteList.indexOf(origin) >= 0) {
        //     callback(null, true);
        // } else {
        //     callback(new Error(`
        //         Origin: ${origin} is not allowed.
        //         WhiteListOrigin: ${whiteList.indexOf(origin) >= 0}
        //     `));
        // }
        callback(null, true);
    }
};

// set app
const app = express();
app.use(cors(corsConfig));
app.use(bodyParser.json({ limit: '1000kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(transactions);

app.use((req, res, next) => {
    if (!!process.env.DEBUG && process.env.DEBUG === 'true') {
        console.log(`
            ${ `Route: `.dim } ${ `${req.originalUrl}`.cyan }
        `);
        console.log(`Headers: `.dim);
        console.log(req.headers);
        console.log(`Request Body: `.dim);
        console.log(req.body);
    }
    next();
});

// call back functions
(async function db() {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DB || 'mongodb://localhost/forestindexdb', { useMongoClient: true });
    await startRouters();
    const env = process.env.NODE_ENV || 'development';
    console.log(`connected to ${env} DB`.dim);
})();

function startRouters() {
    // check for new migrations
    return Promise.resolve()
    .then(postDeploy)
    .then(() => {
        registerUserRouter(app);
        registerServiceRouter(app);
        registerLocationRouter(app);
        registerUploadRouter(app);
        registerContactRouter(app);
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
if (!!process.env.USE_SSL || process.env.USE_SSL === 'true') {
    const privKeyFile = fs.readFileSync(`${__dirname}/../ssl/${process.env.KEY_FILE}`);
    const certFile = fs.readFileSync(`${__dirname}/../ssl/${process.env.CERT_FILE}`);

    https.createServer({
        key: privKeyFile,
        cert: certFile
    }, app)
    .listen(port);
    console.log(`Forest Index API listening on port: ${port}`)
} else {
    app.listen(port, () => {
        console.log(`Test app listening on port: ${port}`.cyan);
    });
}
