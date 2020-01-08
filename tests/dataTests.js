// This is a test suite used to test the data layer.

const snotbotData = require('../snotbotData.js');

async function testSomething() {
  // here you can call a function that is in snotbotData.js and wait for the result
  let someData = await snotbotData.getFlightData('10DR19_f1');
  console.log(someData);
  // now you should have the result from the function you called
  // it's up to you to check and see if it worked. maybe use a
  // console log or something? the result from most of your 
  // functions is going to be an array of records (which are each objects)
}

// here you call a function that tests something in snotbotData.js
testSomething();