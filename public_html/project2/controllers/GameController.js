const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class GameController {
    constructor() {
        console.log('Game Controller Initialized!');
    }
    
    // Fetches all Games
    async games(ctx) {
        console.log('Controller HIT: GameController::games');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Game';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Game: ${err}`);
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

    // Fetches a single Game
    async game(ctx) {
        console.log('Controller HIT: GameController::game');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Game WHERE title = ?;';
            const g = ctx.params.game;
            
            chpConnection.query({
                sql: query,
                values: [g]
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

    // Add a new Game
    async addGame(ctx, next) {
        console.log('Controller HIT: GameController::addGame');
       return new Promise((resolve, reject) => {
           const newG = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Game(title, releaseDate, genre) VALUES (?, ?, ?);',
               values: [newG.title, newG.releaseDate, newG.genre]
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

    // Update a Game
    async updateGame(ctx, next) {
        console.log('Controller HIT: GameController::updateGame');
        return new Promise((resolve, reject) => {
            const g = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Game 
                    SET 
                        releaseDate = ?,
                        genre = ?
                    WHERE title = ?
                    `,
                values: [g.releaseDate, g.genre, ctx.params.game]
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

    // Delete a Game
    async deleteGame(ctx, next) {
        console.log('Controller HIT: GameController::deleteGame');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Game WHERE title = ?;`,
                values: [ctx.params.game]
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

module.exports = GameController;
