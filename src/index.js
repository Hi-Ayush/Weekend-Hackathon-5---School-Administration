const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
const students = require("./InitialData");
let uniqueId= students.length+1;
app.get("/api/student",(req,res)=>{
    res.send(students);
})
app.get("/api/student/:id",(req,res)=>{
    const id=req.params.id;
    const studentData=students.find(student=>student.id===parseInt(id));
    console.log(studentData);
    if(!studentData){
        res.status(404).send("Invalid id");
        return;
    }
    res.send(studentData);
    
})

app.post("/api/student",(req,res)=>{
    const {name,currentClass,division}=req.body;
    if(!(name||currentClass||division)){
        res.status(400).send();
        return;
    }
    const newStudent={
        id:uniqueId++,
        name,
        currentClass:parseInt(currentClass),
        division
    }
    students.push(newStudent);
    res.send({id:newStudent.id})
})

app.put("/api/student/:id",(req,res)=>{
    const id= req.params.id;
    const {name,currentClass,division}=req.body;
    const studentDataIndex=students.findIndex(student=>student.id===parseInt(id));
    if(studentDataIndex===-1){
        res.status(404).send("Invalid id");
        return;
    }
    if(name){
    students[studentDataIndex].name=name;
    }
    if(currentClass){
    students[studentDataIndex].currentClass=parseInt(currentClass);
    }
    if(division){
    students[studentDataIndex].division=division;
    }
    res.send(students[studentDataIndex]);
})
app.delete("/api/student/:id",(req,res)=>{
    const id=req.params.id;
    const studentDataIndex=students.find(student=>student.id===parseInt(id));
    if(studentDataIndex===-1){
        res.status(404).send("Could not Delete As id is not found");
        return;
    }
    students.splice(studentDataIndex,1);
    res.send().status(200);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
