const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')



const authenticationMIddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('NO token provided')
    }
    
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
       
    } catch (error) {
        throw new UnauthenticatedError('Not Authotized to access this route')
    }


}


module.exports = authenticationMIddleware