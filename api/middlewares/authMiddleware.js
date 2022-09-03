const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id.id).select('-password');
            req.id = decoded.id;
            next();
        }catch(err){
            console.log(err);
            return res.status(401).json({message: 'Unauthorized'});
        }
    }
    if(!token){
        return res.status(401).json({message: 'Not authorized, not login'});
    }
    
}