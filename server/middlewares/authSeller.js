import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Check both email & role
    if (
      decoded.email !== process.env.SELLER_EMAIL ||
      decoded.role !== "seller"
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    req.seller = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

export default authSeller;
