import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import uuid from 'uuid/v4';
import cls from 'continuation-local-storage';
// this lib is used without explicitly calling 'colors'
// eslint-disable-next-line
import colors from 'colors';

// database migrations
import migrationAgent from './_db/agent';

// import app modules
import users from './users/router.users';
import services from './services/router.services';
import locations from './locations/router.locations';
import upload from './upload/router.upload';
import contact from './contact/router.contact';

// config
import config from './config.js';
import cors from './_middleware/cors';

// should not set this to a variable if possible
const nameSpace = cls.createNamespace('com.forestindex');

const port = config.port || 8080;

// set app
const app = express();
app.use(bodyParser.json({ limit: '1000kb' }));
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(transactions);
app.listen(port, db);

// call back functions
function db() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db);
    mongoose.connection.once('connected', startUp);

    console.log(`connected to ${config.db}`.dim);
}

function startUp() {
    // check for new migrations
    migrationAgent();

    // start modules
    users(app);
    services(app);
    locations(app);
    upload(app);
    contact(app);

    console.log(`Forest Index API running on port ${port}`.cyan);
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
