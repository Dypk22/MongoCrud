const express = require("express");
const app = express();
require('./db/conn');
const Student = require('./models/Student');
const port = process.env.PORT || 8000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "This is express homepage" });
});

// Insert Data

// app.post("/students", (req, res) => {
//   // console.log(req.body);
//   const user = new Student(req.body);
//   user.save().then(()=>{
//     res.status(201).send(user);
//   }).catch((e)=>{
//     res.status(401).send(e);
//   });
//   // res.send({ message: req.body });
//   // res.send({ req.body + "Welcome students updated" });
// });

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Display all records

app.get("/students", async (req, res) => {
  try {
    const StudentData = await Student.find();
    res.status(200).send(StudentData);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Display single records on behalf of id

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const StudentData = await Student.findById(_id);
    if (!StudentData) {
      res.status(500).send(e);
    } else {
      res.status(200).send(StudentData);      
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true
    });
      res.status(200).send(updateStudents);      
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete

app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudents = await Student.findByIdAndDelete(_id);
    if(!_id){
      res.status(400).send();      
    }
    if(!deleteStudents){
      res.status(401).send("Data Not Find");      
    }
    res.status(200).send("Data Deleted");      
  } catch (e) {
    res.status(500).send(e);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});