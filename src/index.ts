import './db/mongoose';
import {StudentInterface, Student} from './models/student';

async function addStudent(student:StudentInterface) {
  return new Promise<StudentInterface | Error>( async (resolve, reject) => {
    await student.save().then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}
async function getStudent(dni:string) {
  return new Promise<StudentInterface | Error>( async (resolve, reject) => {
    await Student.find({dni: dni}).then((result) => {
      resolve(result[0]);
    }).catch((error) => {
      reject(error);
    });
  });
}

async function updateStudent(dni:string, newStudent: any) {
  return new Promise<StudentInterface | Error | null>( async (resolve, reject) => {
    await Student.findOneAndUpdate({dni: dni}, newStudent, {
      new: true,
      runValidators: true,
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}
async function deleteStudent(dni:string) {
  return new Promise<StudentInterface | Error | null>(async (resolve, reject) => {
    await Student.findOneAndDelete({dni: dni}).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}


async function run() {
  const newStudent = new Student({
    name: `Student1`,
    surname: [`Hernandez`, `Garcia`],
    dni: `43901356T`,
    age: 21,
    email: `a@hotmail.com`,
    degree: `Computer Science`,
    courses: [`DSI`],
  });
  const newStudentUpdated = {
    name: `StudentUpdated`,
    surname: [`Garcia`, `Hernandez`],
    age: 30,
    email: `B@hotmail.com`,
    degree: `Sciense Computer`,
    courses: [`LPP`],
  };
  await addStudent(newStudent).then((result) => {
    console.log('Added:\n' + result);
  }).catch((error) => {
    console.log('Error:\n' + error);
  });
  await getStudent(`43901356T`).then((result) => {
    console.log('Get:\n' + result);
  }).catch((error) => {
    console.log('Error:\n' + error);
  });
  await updateStudent(`43901356T`, newStudentUpdated).then((result) => {
    console.log('Updated:\n' + result);
  }).catch((error) => {
    console.log('Error:\n' + error);
  });
  await deleteStudent(`43901356T`).then((result) => {
    console.log('Deleted:\n' + result);
  }).catch((error) => {
    console.log('Error:\n' + error);
  });
}

run();
