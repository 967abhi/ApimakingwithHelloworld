const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  //first check request header has authorixation or mnot
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ error: "Token is not found" });

  //Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    //verify the JWT TOKENM
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Attach user information to the request objectf
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};
//function to generate JWT token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};
module.exports = { jwtAuthMiddleware, generateToken };
