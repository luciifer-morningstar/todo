require("@babel/register");
const { app } = require("./app");
const { db } = require("./config/db");
let server;
const port = process.env.PORT || 3000;
server = app.listen(port, () => { console.log(`App running on port ${port}...`);});
module.export = app;
