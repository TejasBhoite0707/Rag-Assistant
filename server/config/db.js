const{Pool}=require("pg");

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    
    ssl:{
        rejectUnauthorized:false
    }
});
console.log("DATABASE_URL =>", process.env.DATABASE_URL);
// console.log(import.meta.env.DATABASE_URL);


pool.connect().then(()=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log("err message",err.message);
});

module.exports=pool;