const { registerUser,loginUser,logoutService } = require("../services/auth/authService.js");
const{generateToken}=require("../utils/jwt.js");
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await registerUser(name, email, password);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await loginUser(email, password);

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token:token,
        });

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: err.message
        });

    }

};

const logout = async (req, res) => {

    try {

        const response = await logoutService(res);

        return res.status(200).json(response);

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    register,
    login,
    logout
};