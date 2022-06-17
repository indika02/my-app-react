const express = require('express');
const bodyParser = require ('body-parser');
const cors = require("cors")
const app = express();
const mysql = require('mysql');

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'senuri1324',
    database:'oneway',

});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true})); 

app.post("/api/register",(req,res) => {

    const idCustomer = req.body.idCustomer;
    const password = req.body.password;
    const email = req.body.email;

//register account details store
    const sqlInsert = "INSERT INTO user (password, email) VALUES (?,?);"
    db.query(sqlInsert, [password, email], (err,result)=>{
        res.send('ddfff');
        console.log(result);
        console.log(req.body.password);
    })    
});

//login account details gather
app.post("/api/login",(req,res) => {

    const password = req.body.password;
    const email = req.body.email;

    const sqlSelect = "SELECT password, email FROM user WHERE password=? AND email=?;"
    db.query(sqlSelect,[password,email], (err,result)=>{
        res.send(result);
    })    
});

//user account details gather
app.post("/api/userAcc",(req,res) => {

    const sqlSelect = "SELECT * FROM user WHERE password='aaa' AND email='m.darshanaict@gmail.com';"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })    
});

app.post("/api/vehicleDetails",(req,res) => {

    const sqlSelect = "SELECT * FROM vehicle WHERE userID=1;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
    
});

app.post("/api/TravelDetails",(req,res) => {

    const sqlSelect = "SELECT v.type,td.date,td.From,td.To,td.discription,td.gMapID From vehicle v INNER JOIN vehicletraveldetails vt ON v.id = vt.vehicleID INNER JOIN traveldetails td ON td.id = vt.travelDetailsID INNER JOIN user u ON v.userID = u.ID WHERE u.ID=1;;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
    
});

app.post("/api/selectvahicle",(req,res) => {

    const sqlSelect = "SELECT type FROM vehicle WHERE userID=1;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
    
});
//home first table details gather

app.post("/api/BookingDetails",(req,res) => {
    const id = 0;
    const sqlSelect = "SELECT utd.userID,utd.travelDetailsID,v.type,td.date,td.from,td.To,u.phone,td.discription,utd.dateAndTimeOfBooking FROM vehicle v INNER JOIN vehicletraveldetails vtd ON v.id = vtd.vehicleID INNER JOIN traveldetails td ON td.id = vtd.travelDetailsID INNER JOIN usertravelsdetails utd ON utd.travelDetailsID = td.id INNER JOIN user u ON utd.userID = u.id;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
    
});

//home second table details gather

app.post("/api/routingDetails",(req,res) => {
    const sqlSelect = "SELECT v.type,td.date,td.From,td.To,td.discription,u.phone From vehicle v INNER JOIN vehicletraveldetails vt ON v.id = vt.vehicleID INNER JOIN traveldetails td ON td.id = vt.travelDetailsID INNER JOIN user u ON v.userID = u.ID;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
    
});


app.listen(3001, ()=> {
    console.log('running on port 3001');
});