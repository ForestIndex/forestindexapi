function Manager() {
    this.req = {};
    this.res = {};
    this.data = [];
};

Manager.prototype = Object.create(Manager.prototype);
Manager.prototype.constructor = Manager;

Manager.init = function(req,res) {
        const mng = this;
        mng.req = req;
        mng.res = res;
        mng.data = req.body;
        return Promise.resolve(mng);
};

Manager.handle = function(fn, ...params) {
    return async (manager) => {
        const args = getArgs(params, manager);
        const data = await fn(args);
        const mng = this;

        mng.req = manager.req;
        mng.res = manager.res;
        mng.data = (data === undefined) ? manager.data : data;
        return Promise.resolve(mng);
    };
};

Manager.pass = function(fn, ...params) {
    return async (manager) => {
        const args = getArgs(params, manager);
        await fn(args);
        
        const mng = new Manager();
        mng.req = manager.req;
        mng.res = manager.res;
        mng.data = manager.data;
        return Promise.resolve(mng);
    };
};

function getArgs(params, manager) {
    const args = [];
    params.forEach(function(param) {
        if (param.indexOf('.') > -1) {
            const split = param.split('.');
            const value = getDeepValue(manager, split);
            return args.push(value);
        } else {
            const val = manager[param];
            args.push(val);
        }
    }, this);
    return args;
}

// only being exported until rewire is working for tests
export function getDeepValue(object, array) {
    if (object === undefined) return object;

    const prop = array[0];
    const val = object.hasOwnProperty(prop) ? object[prop] : undefined;
    if (array.length === 1) {
        return val;
    }
    const newArray = array;
    newArray.splice(0, 1);
    return getDeepValue(val, newArray);
}

export default Manager;
