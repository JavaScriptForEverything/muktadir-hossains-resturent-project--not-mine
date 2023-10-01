import verifyJWT from "@/utilities/verifyJWT";

// Check Admin 
export const checkAdmin = async()=>{
    const token =
      request.cookies.get(process.env.LOGIN_COOKIE_NAME)?.value || "";
    const verifiedToken = await verifyJWT(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    return verifiedToken;
}