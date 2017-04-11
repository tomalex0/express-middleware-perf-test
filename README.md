# express-middleware-perf-test
To Test middleware response time and also to trace sync call

Courtesy : https://gist.github.com/ghaiklor/9682b79353aade8a1e59

- `node --trace-sync-io index.js`
-  To see synchronouse call error  http://localhost:3000/sync 
-  To test blocking call - http://localhost:3000/block
-  To test non-blocking delayed  call - http://localhost:3000/non-block


To test how blocking works access `http://localhost:3000/block` first and right away access `http://localhost:3000`
