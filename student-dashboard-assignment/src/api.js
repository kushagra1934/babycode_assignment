import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 });

//mock data
let students = [
  { id: 1, name: "Alice", email: "alice@example.com", course: "Math" },
  { id: 2, name: "Bob", email: "bob@example.com", course: "Science" },
];

mock.onGet("/students").reply(200, students);
mock.onPost("/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = Date.now();
  students.push(newStudent); //new student->students
  return [200, newStudent]; //return new student 200status code
});

export default axios;
