var testEnv = "staging";
let retries = 3;
let maxRetries = 5; //const is wrong here the value is reassigned later in the code.

if (retries < maxRetries) {
  var attemptMessage = `Retry ${retries} of ${maxRetries}`;
  console.log(attemptMessage);
}
// console.log(attemptMessage); // This log was in the wrong place, it should be inside the if statement.

maxRetries = 10;

let userCount: number = 12; // Double quotes are not needed for number type.

//LET VARIANT

// let testEnv = "staging";
// let retries = 3;
// let maxRetries = 5;
// if (retries < maxRetries) 
// {
//   let attemptMessage = `Retry ${retries} of ${maxRetries}`;
//   console.log(attemptMessage);
// }
// maxRetries = 10;
// let userCount: number = 12;

//CONST VARIANT

// const testEnv = "staging";
// let retries = 3;
// let maxRetries = 5;
// if (retries < maxRetries) 
// {
//   const attemptMessage = `Retry ${retries} of ${maxRetries}`;
//   console.log(attemptMessage);
// }
// maxRetries = 10;
// const userCount: number = 12;