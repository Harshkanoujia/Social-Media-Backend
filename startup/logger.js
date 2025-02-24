require('dotenv').config()
const mongoose = require("mongoose");
const ApiLog = require("../models/apiLog");

module.exports = function (req, res, next) {
    if ( process.env.PORT == 3000 ) {
        console.log({
        host: req.headers["host"],
        contentType: req.headers["content-type"],
        Authorization: req.headers["Authorization"],
        method: req.method,
        url: req.url,
        body: req.body,
    })}
    // console.log("resmessage in logging: ", res.message)
    // console.log("reserr in logging: ", res.err)
    // console.log("reserror in logging: ", res.error)

    const cleanup = () => {
        res.removeListener("finish", loggerFunction);
        res.removeListener("close", loggerFunction);
        res.removeListener("error", loggerFunction);
    };

    const loggerFunction = async () => {
    cleanup();
        try {
            if (res.req.apiId) {
                let endTime = new Date();
                let responseTimeInMilli = endTime - req.startTime;
                let routePath = "";
                if (req.route) {
                    routePath = req.route.path;
                }
                await logApis(req.apiId, req.method, req.reqUserId, req.reqLabId, req.originalUrl, req.baseUrl + routePath, req.baseUrl, req.query, req.params, req.body, req.startTime, endTime, responseTimeInMilli, res.statusCode, res.errorMessage);
            }
        } catch (err) {
          console.log("Exception in logging: ", err );
        }
    };

    res.on("finish", loggerFunction); 
    res.on("close", loggerFunction); 
    res.on("error", loggerFunction); 
    req.apiId = new mongoose.Types.ObjectId();
    req.startTime = Math.round(new Date());
    next();
};

async function logApis( apiId, method, userId, labId, completeUrl, url, baseUrl, query, params, body, startTime, endTime, responseTimeInMilli, statusCode, errorMessage ) {
    let apiLog = new ApiLog({
        apiId,
        method,
        userId,
        labId,
        completeUrl,
        url,
        baseUrl,
        query,
        params,
        body,
        startTime,
        endTime,
        responseTimeInMilli,
        statusCode,
        errorMessage
    });
    await apiLog.save();
}