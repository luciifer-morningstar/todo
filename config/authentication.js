const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_TOKEN_EXPIRY } = process.env;
const bcrypt = require('bcryptjs');

export const jwtSignIn = async (data) => {
    try {
        let token = await jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRY });
        return `Bearer ${token}`
    } catch (error) {
        console.log("error jwtSignIn", error)
        throw error;
    }
}

export const jwtVerify = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log("error jwtVerify", error)
        throw error;
    }
}

export const getLoggedInUser = async (token) => {
    try {
        let userDetail = await jwtVerify(token);
        return userDetail?.data ?? userDetail;
    } catch (error) {
        console.log("error getLoggedInUser", error)
        throw error;
    }
}

export const generatePasswords = async (password) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        console.log("passwords", hashedPassword)
        return hashedPassword;
    } catch (error) {
        console.log("error generatePasswords", error);
        throw error;
    }
}

export const comparePassword = async (hashPassword, password) => {
    try {
        let isMatch = await bcrypt.compare(password, hashPassword);
        console.log("isMatch", isMatch)
        return isMatch;

    } catch (error) {
        console.log("error comparePassword", error);
        throw error;
    }
}