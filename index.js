'use strict';

// The purpose of this example is to show
// how you can block the event loop with JavaScript.
// There is 3 routes
// / respond with Hello, World text
// /block uses JavaScript while for 5 seconds
// /non-block uses setTimeout for 5 seconds

// Do the following
// curl localhost:3000/
// You get Hello, World

// curl localhost:3000/block and curl localhost:3000/ at once
// your server is blocked now, because of while in JavaScript
// JavaScript code is executed in the main thread, where event loop
// that's why it blocks, because of while execution

// curl localhost:3000/non-block and curl:localhost:3000/ at once
// you will get Hello, World and after 5 seconds I am done
// in this case you don't block the server
// because operation thrown in thread-pool
// freeing the main thread for other connections

const express = require('express');
const app = express();
const responseTime = require( 'connect-middleware-response-time' );
const cp = require('child_process')

// Use the response time middleware for all requests:
app.use( responseTime( logger ) );

function logger( value ) {
    console.log( 'Response time: %s ms', value );
}

app.get('/', (req, res) => res.send('Hello, World'));

app.get('/block', (req, res) => {
    const end = Date.now() + 5000;
    while (Date.now() < end) {
        const doSomethingHeavyInJavaScript = 1 + 2 + 3;
    }
    res.send('I am done!');
});

app.get('/non-block', (req, res) => {
    // Imagine that setTimeout is IO operation
    // setTimeout is a native implementation, not the JS
    setTimeout(() => res.send('I am done!'), 5000);
});

app.get('/sync', (req, res) => {
    let stdout = cp.execFileSync('whoami');
    res.end(`${stdout}\n`);
});


app.listen(3000, () => console.log('app listening on port 3000'));
