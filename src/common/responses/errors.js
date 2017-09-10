export function internalError(req, res, error) {
    return handleError(res, 500, error, req.connection.remoteAddress, req.connection.remoteAddress, req.originalUrl);
}

export function forbidden(req, res, error) {
    return handleError(res, 403, error, req.connection.remoteAddress, req.originalUrl);
}

export function badRequest(req, res, error) {
    return handleError(res, 504, error, req.connection.remoteAddress, req.connection.remoteAddress, req.originalUrl);
}

function handleError(res, code, msg, origin, apiRoutePath) {
    const errLog = `\n ${origin} ${apiRoutePath} ${msg}`;
    console.log(errLog);    
    return res.status(code).send(msg);
}
