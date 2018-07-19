const takeOneSecondToRun = async (callback) => {
    console.log('starting inside...');

    await (new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log('I was called within the async iife when it resolved');
                resolve(true)
            },
            1000
        );
    }));

    console.log('ending inside...');
    if (callback && typeof callback === 'function') {
        callback();
    }
};

module.exports = takeOneSecondToRun;
