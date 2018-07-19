const takeOneSecondToRun = require('./lib/sync-with-async-iife.js');

console.log('starting outside...');
takeOneSecondToRun();
console.log('ending outside...');
