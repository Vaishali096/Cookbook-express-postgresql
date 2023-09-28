const express = require('express')
require('dotenv').config();
const { Pool, Client } = require("pg");
const app = express()
app.use(express.json());
const cors = require('cors')
app.use(cors());

const PORT = 8080;

const pool = new Pool();

// app.get("/", (req,res)=>{
//     res.send("welcome!");
// });

app.get("/recipecards", (req,res)=>{
    pool
    .query("SELECT * FROM recipees;")
    .then((data)=>res.json(data.rows))
    .catch((e)=>res.sendStatus(500).send("Something went wrong"));
});

app.get("recipeinstructions/:id", (req,res)=>{
const {id}= req.params;
pool
.query("SELECT * FROM recipees WHERE id = $1;", [id])
.then((data)=> res.json(data.rows))
.catch((e)=>res.sendStatus(500).json(e));
pool.end();
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});
