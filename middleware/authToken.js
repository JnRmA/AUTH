const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    console.log('Authorization header:', authHeader); // Log the full Authorization header
    console.log('Extracted token:', token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = decoded; // Attach the decoded token payload (with user ID) to `req.user`
        console.log('Decoded JWT:', user); // Log the decoded payload
    req.user = user;
        next();

    });
}
module.exports = authenticateToken;