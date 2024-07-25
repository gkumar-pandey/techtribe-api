import { decodeToken, extractUserIdFromToken } from "../utils";

export const authVerification = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    const userId = extractUserIdFromToken(decodedToken);
    req.user = { id: userId };
    return next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ success: false, message: "Please provide Auth token", error });
    throw error;
  }
};
