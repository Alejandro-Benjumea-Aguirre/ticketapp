
function httpError(req, res) {

    return res.status(500).json({
        status: false,
        msg: res.msg
    });

}

module.exports = httpError;