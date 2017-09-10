export function sendData(manager) {
    return manager.res.status(200).send(manager.data);
}

export function goodPost(manager) {
    return manager.res.status(204).send('Success');
}

export function setAuthHeader(manager) {
    const res = manager.res;
    const token = manager.data;
    // set the cookie in the header here too * TO DO
    res.send({token});
}

export function pipeFile(manager) {
    const res = manager.res;
    res.pipe(manager.data[0].Body);
}
