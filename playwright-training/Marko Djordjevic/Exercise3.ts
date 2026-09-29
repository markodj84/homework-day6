const testResults = [
  { name: "Login test", status: "passed", duration: 1200 },
  { name: "Checkout test", status: "failed", duration: 3400 },
  { name: "Search test", status: "passed", duration: 800 },
];
const [{ name: firstName, status: firstStatus }] = testResults;
for (const { name, duration } of testResults) {
    console.log(`${name}: ${duration}ms`);
}
const failedName = testResults
    .filter(test => test.status === "failed")
    .map(test => test.name);
const totalDuration = testResults.reduce(
    (total, test) => total + test.duration,
    0
);
console.log(firstName, firstStatus);
console.log(failedName);
console.log(totalDuration);