const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {

    async issueToken (payload) {
       const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' });
       return token;
    },
    
    async hashPwd (pass) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        return hash;
    },
    
    async comparePwd (pass, dbPass) {
        const comparePass = await bcrypt.compare(pass, dbPass);
        return comparePass;
    }
}


