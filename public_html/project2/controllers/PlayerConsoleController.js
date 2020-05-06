const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class PlayerConsoleController {
    constructor() {
        console.log('PlayerConsole Controller Initialized!');
    }
    
    // Fetches all PlayerConsoles
    async playerConsoles(ctx) {
        console.log('Controller HIT: PlayerConsoleController::playerConsoles');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM PlayerConsole';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.PlayerConsole: ${err}`);
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

    // Fetches a single PlayerConsole
    async playerConsole(ctx) {
        console.log('Controller HIT: PlayerConsoleController::playerConsole');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM PlayerConsole WHERE console = ?;';
            const pc = ctx.params.playerConsole;
            
            chpConnection.query({
                sql: query,
                values: [pc]
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

    // Add a new PlayerConsole
    async addPlayerConsole(ctx, next) {
        console.log('Controller HIT: PlayerConsoleController::addPlayerConsole');
       return new Promise((resolve, reject) => {
           const newPC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO PlayerConsole(player, console, isPrimary) VALUES (?, ?, ?);',
               values: [newPC.player, newPC.console, newPC.isPrimary]
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

    // Update a PlayerConsole
    async updatePlayerConsole(ctx, next) {
        console.log('Controller HIT: PlayerConsoleController::updatePlayerConsole');
        return new Promise((resolve, reject) => {
            const pc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE PlayerConsole 
                    SET isPrimary = ?
                    WHERE player = ? AND console = ?
                    `,
                values: [pc.isPrimary, ctx.params.playerConsole]
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

    // Delete a PlayerConsole
    async deletePlayerConsole(ctx, next) {
        console.log('Controller HIT: PlayerConsoleController::deletePlayerConsole');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM PlayerConsole WHERE player = ? AND console = ?;`,
                values: [ctx.params.playerConsole]
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

module.exports = PlayerConsoleController;
