const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      console.log("Authorization header missing");
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded Token:", decoded); 
    next();
  } catch (err) {
    console.log("Error verifying token:", err.message);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};


const checkRole = (roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role); 
    console.log("Allowed Roles:", roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
};


module.exports = { protect, checkRole };
