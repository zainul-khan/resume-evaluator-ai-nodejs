const { STATUS_CODES } = require("../utils/constant.utils.js");


module.exports = {
 
    validateUser: async (req, res, next) => {

        try {

            let token = req.header("Authorization")

            if (!token) {
                return Response.errorResponseWithoutData(res, "Unauthorized access", STATUS_CODES.ACCESS_DENIED)
            }

            token = token.split("Bearer ")[1];

            await jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
                if (err) {
                    console.log("tokennotverifiedinvalidateuser", err)
                    return res.status(STATUS_CODES.ACCESS_DENIED).json({ error: 'Unauthorized access' })
                }
                else {
                    req.authUserId = decoded.id;
                    req.authUserRole = decoded.role
                    next();
                }
            })

        } catch (error) {
            console.log("errorinmiddleware", error);
        }

    },
}