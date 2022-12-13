const { admin } = require('../config/index')

const checkAdmin = (req, res, next) => {
    if (!admin) {
        return res.status(401).json({
            msg: 'No estás autorizado!'
        })
    }
    next();
}

module.exports = {
    isAdmin: checkAdmin
}