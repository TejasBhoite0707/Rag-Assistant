const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");

const authenticateUser = async(req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

         const result = await pool.query(
            `
            SELECT
                id,
                name,
                email
            FROM users
            WHERE id = $1
            `,
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = result.rows[0];

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

module.exports = authenticateUser;