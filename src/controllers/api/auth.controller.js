const Joi = require("joi");
const { User } = require('../../models/User.model.js');
const Response = require("../../utils/response.utils.js");
const Helper = require("../../utils/helper.utils.js");
const Auth = require("../../utils/auth.utils.js");
const { USER_STATUS, FILE_SIZE_LIMIT } = require("../../utils/constant.utils.js")



module.exports = {

    signUp: async (req, res) => {

        try {

            const schema = Joi.object({
                name: Joi.string().min(2).max(50).required(),
                email: Joi.string().min(1).max(50).required(),
                password: Joi.string().min(5).max(50).required(),
                confirmPassword: Joi.string().min(5).max(50).required(),
                phone: Joi.string().optional(),
                address: Joi.string().required()
            });

            const { error, value } = schema.validate(req.body);

            if (error) return Response.joiErrorResponseData(res, error);

            let profilePicPath = null;

            const emailExist = await User.findOne({ email: value.email })

            if (emailExist) return Response.errorResponseWithoutData(res, 'Email already exist')

            if (!req.files || !req.files.profile) {
                return Response.errorResponseWithoutData(res, "Profile pic is required")
            } else if (req.files.profile.size > FILE_SIZE_LIMIT.IMAGE){
                return Response.errorResponseWithoutData(res, "Image cannot be greater then 5mb")
            }
            else{

                let profilePic = await Helper.imageUpload(
                    req.files.profile,
                    "public/assets/images/"
                );

                profilePicPath = `/${profilePic}`;
            }

            const hashPass = await Auth.hashPwd(value.password);

            let userObj = {
                name: value.name,
                email: value.email,
                profile: profilePicPath,
                password: hashPass,
                resetToken: null,
                phone: value.phone,
                address: value.address,
                status: USER_STATUS.ACTIVE
            }

            let user = await User.create(userObj);

            //generate token
            const generateToken = await Auth.issueToken({
                id: user.id,
                email: user.email,
            });

            user.resetToken = generateToken;

            //update created user object
            await user.save();

            return Response.successResponseData(res, "User created successfully", user);

        } catch (error) {

            console.log('error=>', error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    login: async (req, res) => {

        try {

            const schema = Joi.object({
                email: Joi.string().min(1).max(50).required().label("Email"),
                password: Joi.string().required().label("Password"),
            });

            const { error, value } = schema.validate(req.body);

            if (error) return Response.joiErrorResponseData(res, error);

            const user = await User.findOne({ email: value.email })

            if (!user) return Response.errorResponseWithoutData(res, 'Invalid credentials');

            const comparePass = await Auth.comparePwd(value.password, user.password);

            if (!comparePass) return Response.errorResponseWithoutData(res, 'Invalid credentials');

            //generate token
            const generateToken = await Auth.issueToken({
                id: user.id,
                email: user.email,
            });

            user.resetToken = generateToken;

            //update user object
            await user.save();

            return Response.successResponseData(res, "User logged in successfully", user);



        } catch (error) {
            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    fetchUser: async (req, res) => {

        try {

            const user = await User.findOne({ _id: req.authUserId })

            if (!user) return Response.errorResponseWithoutData(res, 'User not exist');

            return Response.successResponseData(res, "User fetched successfully", user)

        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    logOut: async (req, res) => {

        try {

            const user = await User.findOne({ _id: req.authUserId });

            if (!user) return Response.errorResponseWithoutData(res, 'Invalid user');

            user.resetToken = null
            await user.save();

            return Response.successResponseWithoutData(res, 'User logged out successfully');

        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
}