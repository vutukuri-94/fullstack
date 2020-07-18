const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const util=require('util');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router()

var cors= require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}))

 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'venkat@123',
  database: 'oms_db'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


// register new user

// app.post('/register',(req, res) => {
// console.log(req)
//   //const connection = await conn;

//   const sql = `INSERT INTO users (email, username, password, creation_date) values ('${req.body.email}', '${req.body.username}', '${bcrypt.hashSync(req.body.password, 10)}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`
//   conn.query(sql, (err, result) => {
//     connection.release();
//     if (err) {
//       console.log(err);
//       return res.status(501).json({ message: 'Error registering user.' })
//     }
//     return res.status(200).json(result);
//   });

// })

app.post('/api/register',(req, res) => {
  console.log( req.body)
  //let data = {id: req.body.id, text:req.body.text, image: req.body.image,price:req.body.price, qty:req.body.qty, totel:res.body.totel};
  //let reqbody=req.body;
  let data =req.body;
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


app.post('/api/login',(req, res) => {
  console.log(req.body[0].email)
  let sql = "SELECT username,password FROM users WHERE email = ?";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// app.get('api/login', (req, res) => {

//   //const connection = await mysql.getConnection();
//   let sql = "SELECT * FROM users WHERE email =venkat@gmail.com";
//   let query = conn.query(sql,(err, result) => {
//     // if (err) {
//     //   throw err
//     // }
//     if(err) throw err;
//     // if (result[0]) {
//     //   if (bcrypt.compareSync(req.body.password,result[0].password)) {
//     //     let token = jwt.sign({ username: result[0].username }, 'secret', { expiresIn: '3h' });
//     //     return res.status(200).json(token);
//     //     console.log(this.token)
//     //   }
//     //   else {
//     //     return res.status(500).json({ message: 'Invalid Credentials' });
//     //   }
//     // }
//     // else {
//     //   return res.status(500).json({ message: 'User email is not registered.' })
//     // }
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
 
//show all products
app.get('/api/products',(req, res) => {
  let sql = "SELECT * FROM product_list";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product_list WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new product
app.post('/api/cart',(req, res) => {
  console.log( req.body)
  //let data = {id: req.body.id, text:req.body.text, image: req.body.image,price:req.body.price, qty:req.body.qty, totel:res.body.totel};
  //let reqbody=req.body;
  let data =req.body;
  let sql = "INSERT INTO cart_items SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
// get cart items

app.get('/api/cartlist',(req, res) => {
  let sql = "SELECT * FROM cart_items";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//update product
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE product_list SET pid='"+req.body.pid+"', purl='"+req.body.purl+"', type='"+req.body.type+"' WHERE pid="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete product
app.delete('/api/cartlist/:id',(req, res) => {
  let sql = "DELETE FROM cart_items WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});