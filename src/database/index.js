const fs = require('fs');
const path = require('path');

class controller
{
    constructor(database){
        // Propiedades
        this.database = database;
        this.lastdata = {};
        // Funciones que utilizan el contexto global
        this.databaseCreate.bind(this);
        this.databaseConnect.bind(this);
        this.databaseRead.bind(this);
        this.databaseCreateTable.bind(this);
        this.databaseCommit.bind(this);
    }

    databaseCreate(){ // Creamos la base de datos en blanco
        this.databaseConnect(function(ctx){
            fs.writeFileSync(ctx.databasePath(), JSON.stringify({}));
            return true;
        });
    }

    databaseConnect(callback){ // Simulamos una conexion que nos permitira trabajar con las demas funciones solo si existe el archivo
        if(fs.existsSync(this.databasePath()))
            callback(this);
        else
            return undefined;
    }

    databaseRead(){ // 
        this.databaseConnect(function(ctx){
            ctx.lastdata = JSON.parse(fs.readFileSync(ctx.databasePath(), "utf-8"));
            return ctx.lastdata;
        });
    }

    databaseCreateTable(tname, tstruct){
        this.databaseConnect(function(ctx){
            let temp = ctx.lastdata;
            temp[tname] = [tstruct];
            ctx.lastdata = temp;
            ctx.databaseCommit();
        });
    }

    databaseCommit(){
        this.databaseConnect(function(ctx){
            fs.writeFileSync(ctx.databasePath(), JSON.stringify(ctx.lastdata));
        });
    }

    databasePath(){
        return path.join(__dirname, this.database+".json");
    }
}

module.exports = controller;