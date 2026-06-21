import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = req.cookies?.admin_token;

    // Fallback to Authorization header if cookie is missing
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default auth;
