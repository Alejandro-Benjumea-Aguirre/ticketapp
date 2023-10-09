
function httpError(res, e) {

    return res.status(500).json({
        status: false,
        msg: e.msg
    });

}

module.exports = httpError;