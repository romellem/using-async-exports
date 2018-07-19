const takeOneSecondToRun = require('./lib/async.js');

(async () => {
    console.log('starting outside...');
    await takeOneSecondToRun();
    console.log('ending outside...');
})();
