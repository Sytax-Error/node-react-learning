// import EventEmitter from "events";

// const emitter = new EventEmitter();

// emitter.on("greet", () => {
//   console.log("Hello from emitter events");
// });

// emitter.emit("greet");

// ********************* With single parameter ****************

// import EventEmitter from "events";

// const emitter = new EventEmitter();

// emitter.on("register", (name) => {
//   console.log(`Hello ${name}`);
// });

// emitter.emit("register", "Lavesh");

// ********************* With Multipale parameter ****************

// import EventEmitter from "events";

// const emitter = new EventEmitter();

// emitter.on("register", (name, email) => {
//   console.log("Emitter start");

//   console.log("Name: ", name);
//   console.log("Email: ", email);
// });

// emitter.emit("register", "test", "test@gmail.com");

// ********************* Pass object data with event ****************
// one event can have multiple listeners.
// import EventEmitter from "events";

// const emitter = new EventEmitter();

// emitter.on("register", (user) => {
//   console.log("Name: ", user.name);
// });

// emitter.on("register", (user) => {
//   console.log("Email: ", user.email);
// });

// emitter.emit("register", {
//   name: "TestUser",
//   email: "test@test.com",
// });

// ********************* once() listener run only one time ****************
// import EventEmitter from "events";

// const emitter = new EventEmitter();

// emitter.once("greet", () => {
//   console.log("Welcom to the evets");
// });

// emitter.emit("greet");
// emitter.emit("greet");
// emitter.emit("greet");
// emitter.emit("greet");
// emitter.emit("greet");

// ********************* Remove listener ****************

// import EventEmitter from "events";

// const emitter = new EventEmitter();

// const sendEmail = (user) => {
//   console.log("User email is: ", user.email);
// };

// emitter.on("register", sendEmail);

// emitter.emit("register", {
//   name: "Test",
//   email: "test@com",
// });

// emitter.off("register", sendEmail);

// emitter.emit("register", {
//   name: "Test1",
//   email: "test1@com",
// });

// ********************* simple real-world example ****************

import EventEmitter from "events";

const emitter = new EventEmitter();

const sendWelcomeEvent = (user) => {
  console.log(`Welcome event sent to ${user.email}`);
};

const saveActivityLog = (user) => {
  console.log(`Activity logs saved for ${user.name}`);
};

emitter.on("userRegistered", sendWelcomeEvent);
emitter.on("userRegistered", saveActivityLog);

const registerUser = (user) => {
  console.log(`User saved in database: ${user.name}`);
  emitter.emit("userRegistered", user);
};

registerUser({
  name: "Test User",
  email: "test@nic.com",
});
