import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  console.log("Token:", token);
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({
      succes: false,
      message: "access denied, No token provided",
      error: "token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({
      succes: false,
      message: "invalid token",
      error: "invalid token",
    });
  }
};
