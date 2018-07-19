const takeOneSecondToRun = require('./lib/sync-with-async-iife.js');

console.log('starting outside...');
takeOneSecondToRun();
console.log('ending outside...');

// Creates the following output:
// 
//     starting outside...
//     starting inside...
//     ending inside...
//     ending outside...
//     I was called within the async iife when it resolved
//
