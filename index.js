const database = require('./src/database/index');
const controller = new database("ejemplo");


controller.databaseCreate();
controller.databaseCreateTable("usuarios", {
    id:1,
    name:"eddy"
});
console.log(controller);