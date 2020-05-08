const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class TrophyController {
    constructor() {
        console.log('Trophy Controller Initialized!');
    }
    
    // Fetches all Trophies
    async trophies(ctx) {
        console.log('Controller HIT: TrophyController::trophies');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Trophy';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Trophy: ${err}`);
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

    // Fetches Trophies for a single game
    async trophy(ctx) {
        console.log('Controller HIT: TrophyController::trophy');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Trophy WHERE game = ?;';
            const t = ctx.params.trophy;
            
            chpConnection.query({
                sql: query,
                values: [t]
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

    // Add a new Trophy
    async addTrophy(ctx, next) {
        console.log('Controller HIT: TrophyController::addTrophy');
       return new Promise((resolve, reject) => {
           const newT = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Trophy(game, name, value) VALUES (?, ?, ?);',
               values: [newT.game, newT.name, newT.value]
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

    // Update a Trophy
    async updateTrophy(ctx, next) {
        console.log('Controller HIT: TrophyController::updateTrophy');
        return new Promise((resolve, reject) => {
            const t = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Trophy 
                    SET value = ?
                    WHERE game = ? AND name = ?
                    `,
                values: [t.value, ctx.params.game, ctx.params.name]
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

    // Delete a Trophy
    async deleteTrophy(ctx, next) {
        console.log('Controller HIT: TrophyController::deleteTrophy');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Trophy WHERE game = ? AND name = ?;`,
                values: [ctx.params.game, ctx.params.name]
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

module.exports = TrophyController;
