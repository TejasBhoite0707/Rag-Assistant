const {hashPassword,comparePassword}=require("../../utils/hash.js");
const pool = require("../../config/db.js");
const registerUser=async (name, email, password)=>{
    const exisitingUser=await pool.query("SELECT id FROM users WHERE email=$1",
        [email]
    );

    if(exisitingUser.rows.length>0){
        throw new Error("Email already registered");
    }

        const hashedPassword = await hashPassword(password);
       const result=await pool.query(
        `INSERT INTO users(name,email,password)
         VALUES($1,$2,$3)
         RETURNING id,name,email,created_at
        `,
        [name,email,hashedPassword]
       );
       return result.rows[0];
}

const loginUser=async(email,password)=>{
    const result=await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    )
    if (result.rows.length === 0) {
        throw new Error("Invalid Email or Password");
    }

    const user = result.rows[0];

    const isMatch = await comparePassword(
        password,
        user.password
    );

    if(!isMatch){
        throw new Error("Invalid Email or Password");
    }
    return user;
}

module.exports={
    registerUser,
    loginUser,
}