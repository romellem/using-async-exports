# Running an exported module that contains async / await work

So I had a problem.

I was using the library [Puppeteer](https://github.com/GoogleChrome/puppeteer)
(which is amazing by the way) and essentially had a file that looked like this:

    // # standalone.js
    console.log('Doing some work...')

    // ...

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('some.site');
        // ... etc. ...
        await browser.close();
    })()

And when I ran `node standalone.js` everything worked fine!

Then, that file turned into a function, which was exported

    // # sync-export.js
    function mySyncExportFunction() {
        console.log('Doing some work...')

        // ...

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('some.site');
            // ... etc. ...
            await browser.close();
        })()
    }

    module.exports = mySyncExportFunction;

<!-- space -->

    // # use-sync-export.js
    const myFunction = require('./sync-export.js');

    console.log('Starting...');
    myFunction();
    console.log('Done!')

I quickly found, that didn't do what I thought! And after experimenting with
this some more, I think I have a handle around it.

Essentially, if I am _calling_ an `async` function, and I am not `await`ing
that function call, it doesn't wait for anything else around it. And of course,
if I am going to `await` a function, that function need to be `async`!

Essentially, if I ever care about the results of some asynchronous action, I
need to `await` it. And of course, if I `await` something, it needs to be in
an `async` function. Which means, I may need to use an `async` [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
to mimic "top-level" asynchronous results.


Results:

    $ node i-dont-work.js # Synchronous export with Asynchronous IIFE within
    starting outside...
    starting inside...
    ending inside...
    ending outside...
    I was called within the async iife when it resolved
    
    $ node i-also-dont-work.js # Asynchronous export, called at top level
    starting outside...
    starting inside...
    ending outside...
    I was called within the async iife when it resolved
    ending inside...
    
    $ node i-work.js # Asynchronous export, called with `await` within async IIFE
    starting outside...
    starting inside...
    I was called within the async iife when it resolved
    ending inside...
    ending outside...
