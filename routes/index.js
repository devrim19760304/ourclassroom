const express = require("express");
const fs = require("fs");
const path = require("path");

var router = express.Router();

const { Student, ClassRoom } = require("../classes/student.js");

//initialie classroom
//let classRoom = null;
let classRoom = new ClassRoom("Kodehode Stars");

//we import student list
const loadStudents = () => {
  const studentFilePath = path.join(__dirname, "../data/students.json");

  try {
    const data = fs.readFileSync(studentFilePath, "utf-8");
    const students = JSON.parse(data); //need to parse

    students.forEach((studentData) => {
      const { name, age } = studentData;
      const student = new Student(name, age); //we insert in our student class
      classRoom.AddNewStudent(student); //and we insert students in our classRoom
    });
    //confirmation
    console.log("Students loaded");
  } catch (error) {
    console.error("error", error.message);
  }
};

//call load students
loadStudents();

router.get("/", (req, res, next) => {
  //return res.json({ message: "hello world" });
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/showclassroom", (req, res) => {
  if (!classRoom) {
    return res.json({
      message: "No classroom exists cerate one",
    });
  }

  return res.json({
    name: classRoom.name,
    students: classRoom.DisplayStudents(),
  });
});



router.get("/findoldest", (req, res) => {
  const theMaxAge = classRoom.FindMaxAge();
  return res.json({
    data: theMaxAge,
  });
});

router.get("/findyoungest", (req, res) => {
  const theMinAge = classRoom.FindMinAge();
  return res.json({
    data: theMinAge,
  });
});

router.post("/addnewstudent", (req, res) => {
  const { name, age } = req.body;

  // Validate inputs
  if (!name || !age || typeof name !== "string" || typeof age !== "number") {
    return res.status(400).json({
      message: "Provide a valid name (string) and age (number).",
    });
  }

  try {
    // Check if the student already exists
    const existingStudent = classRoom.students.some(
      (student) => student.name === name
    );
    if (existingStudent) {
      return res.status(400).json({
        message: `A student with the name '${name}' already exists.`,
      });
    }

    // Create and add new student
    const newStudent = new Student(name, age);
    classRoom.AddNewStudent(newStudent);

    return res.status(201).json({
      message: `New student '${name}' added successfully.`,
      student: { name, age },
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      message: "An error occurred while adding the student.",
      error: error.message,
    });
  }
});

module.exports = router;
