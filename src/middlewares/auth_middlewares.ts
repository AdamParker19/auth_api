import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const authorized = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = authorized;
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: "Invalid token." });
  }
};

export { verifyToken }
