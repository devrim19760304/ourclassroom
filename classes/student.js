//student class

class Student {
  constructor(name, age) {
    this.id = null;
    this.name = name;
    this.age = age;
  }

  showStudent() {
    return {
      name: this.name,
      age: this.age,
    };
  }
}

class ClassRoom {
  constructor(name, students) {
    this.name = name;
    this.students = [];
  }

  DisplayStudents() {
    if (this.students.length === 0) return "No student yet in the classRoom";

    return this.students.map((student) => ({
      name: student.name,
      age: student.age,
    }));
  }

  AddNewStudent(student) {
    if (student instanceof Student) {
      const studentExist = this.students.some((s) => s.name == student.name);

      if (!studentExist) {
        this.students.push(student);
        return `Student ${student.name} added successfully.`;
      } else {
        return `stıdent ${student.name} already exist`;
      }
    } else {
      return "Only student instances can be added.";
    }
  }

  DeleteStudent(student) {
    if (this.students.length === 0) return "No student yet in the classRoom";
    const studentExist = this.students.some((s) => s.name == student.name);
    if (!studentExist) {
      return `Student with name ${student.name} does not exist`;
    }

    //using remove
    this.students = this.students.filter((s) => s.name !== student.name);
    return `student with name  ${student.name} removed`;
  }

  UpdateStudent(student, updatedData) {
    if (this.students.length === 0) return "No students yet in the class.";

    const studentIndex = this.students.findIndex(
      (s) => s.name === student.name
    );

    if (studentIndex === -1) {
      return `Student with name ${student.name} does not exist in the class.`;
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return "No update data provided.";
    }

    const studentToUpdate = this.students[studentIndex];
    if (updatedData.name) studentToUpdate.name = updatedData.name;
    if (updatedData.age) studentToUpdate.age = updatedData.age;

    return `Student with name ${student.name} has been updated.`;
  }

  AverageAge() {
    //we can use reduce method
    if (this.students.length === 0) return 0;
    let sumOfClassRoom = this.students.reduce((acc, cur) => {
      return acc + cur.age;
    }, 0);

    return sumOfClassRoom / this.students.length;
  }

  FindMaxAge() {
    if (this.students.length === 0)
      return { message: "No students in the class." };

    let maxAge = Math.max(...this.students.map((student) => student.age));
    let studentsWithMaxAge = this.students.filter(
      (student) => student.age === maxAge
    );

    return {
      maxAge,
      students: studentsWithMaxAge.map((student) => student.showStudent()),
    };
  }

  FindMinAge() {
    if (this.students.length === 0)
      return { message: "No students in the class." };

    let minAge = Math.min(...this.students.map((student) => student.age));
    let studentsWithMinAge = this.students.filter(
      (student) => student.age === minAge
    );

    return {
      minAge,
      students: studentsWithMinAge.map((student) => student.showStudent()),
    };
  }
}

module.exports = { Student, ClassRoom };
