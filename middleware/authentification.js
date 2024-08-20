const jwt = require('jsonwebtoken')

const authentification = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'AzQ,PI)0(')

        req.utilisateur = decode
        next()

    } catch (error) {
        // console.log(error);
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                message: 'Token Expiré !'
            })
        }
        else {
            res.status(203).json({ msg: "Authentification refusé " });
        }
    }
}
module.exports = { authentification }
