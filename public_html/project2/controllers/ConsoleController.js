const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ConsoleController {
    constructor() {
        console.log('Console Controller Initialized!');
    }
    
    // Fetches all Consoles
    async consoles(ctx) {
        console.log('Controller HIT: ConsoleController::consoles');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Console';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Console: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Fetches a single Console
    async console(ctx) {
        console.log('Controller HIT: ConsoleController::console');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Console WHERE id = ?;';
            const c = ctx.params.console;
            
            chpConnection.query({
                sql: query,
                values: [c]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a new Console
    async addConsole(ctx, next) {
        console.log('Controller HIT: ConsoleController::addConsole');
       return new Promise((resolve, reject) => {
           const newC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Console(id, name) VALUES (?, ?);',
               values: [newC.id, newC.name]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a Console
    async updateConsole(ctx, next) {
        console.log('Controller HIT: ConsoleController::updateConsole');
        return new Promise((resolve, reject) => {
            const c = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Console 
                    SET name = ?,
                    WHERE id = ?
                    `,
                values: [c.name, ctx.params.console]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Delete a Console
    async deleteConsole(ctx, next) {
        console.log('Controller HIT: ConsoleController::deleteConsole');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Console WHERE id = ?;`,
                values: [ctx.params.console]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = ConsoleController;
