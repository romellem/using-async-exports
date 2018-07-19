const takeOneSecondToRun = require('./lib/async.js');

console.log('starting outside...');
takeOneSecondToRun();
console.log('ending outside...');

// Creates the following output:
// 
//     starting outside...
//     starting inside...
//     ending outside...
//     I was called within the async iife when it resolved
//     ending inside...
//
