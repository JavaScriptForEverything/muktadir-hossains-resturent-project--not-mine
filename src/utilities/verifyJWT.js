import { jwtVerify } from "jose";

async function verifyJWT(token, secretKey) {
  const secret = new TextEncoder().encode(secretKey);
  try {
    // Verify the JWT using the provided secret key
    const verifiedToken = await jwtVerify(token, secret);

    // If verification is successful, return the verified token's Payload::
    return verifiedToken.payload
  } catch (error) {
    // console.log(error);
    // If verification fails, an error will be thrown
    // console.error("Token verification failed:", error.message);
    if(error.code === "ERR_JWT_EXPIRED"){
        console.log("Token Expired!")
    }
    return null;
  }
}

export default verifyJWT;
