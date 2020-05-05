const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class PlayerController {
    constructor() {
        console.log('Player Controller Initialized!');
    }
    
    // Fetches all Players
    async players(ctx) {
        console.log('Controller HIT: PlayerController::players');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Player';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Player: ${err}`);
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

    // Fetches a single Player
    async player(ctx) {
        console.log('Controller HIT: PlayerController::player');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Player WHERE id = ?;';
            const p = ctx.params.player;
            
            chpConnection.query({
                sql: query,
                values: [p]
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

    // Add a new Player
    async addPlayer(ctx, next) {
        console.log('Controller HIT: PlayerController::addPlayer');
       return new Promise((resolve, reject) => {
           const newP = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Player(id, username) VALUES (?, ?);',
               values: [newP.id, newP.username]
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

    // Update a Player
    async updatePlayer(ctx, next) {
        console.log('Controller HIT: PlayerController::updatePlayer');
        return new Promise((resolve, reject) => {
            const p = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Player 
                    SET username = ?
                    WHERE id = ?
                    `,
                values: [p.username, ctx.params.player]
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

    // Delete a Player
    async deletePlayer(ctx, next) {
        console.log('Controller HIT: PlayerController::deletePlayer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Player WHERE id = ?;`,
                values: [ctx.params.player]
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

module.exports = PlayerController;
