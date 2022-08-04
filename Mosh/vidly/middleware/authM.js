const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function auth(req,res,next){
    // const token = req.header('x-auth-token')
    // if(!token) return res.status(401).send('Access denied . No token provided. ')
    // try {
    //     const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
    //     req.user = decodedPayload;
    //     next();
    // } catch (error) {
    //    return res.status(401).send('Invalid token booooo') 
    // }
    const token = req.cookies.token
    if(!token) return res.status(401).send('Access denied. No token provided');
    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    } catch (error) {
        return res.status(401).send('Access denied. No token provided')
    }
}
