const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class TrophyScoreController {
    constructor() {
        console.log('TrophyScore Controller Initialized!');
    }
    
    // Fetches all TrophyScores
    async trophyScores(ctx) {
        console.log('Controller HIT: TrophyScoreController::trophyScores');
        return new Promise((resolve, reject) => {
            const query = 'SELECT username AS Player, GetTrophyScore(username) AS "Trophy Score" FROM Player;';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.TrophyScore: ${err}`);
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

    // Fetches a single TrophyScore
    async trophyScore(ctx) {
        console.log('Controller HIT: TrophyScoreController::trophyScore');
        return new Promise((resolve, reject) => {
            const query = 'SELECT username AS Player, GetTrophyScore(username) AS "Trophy Score" FROM Player WHERE username = ?;';
            const ts = ctx.params.trophyScore;
            
            chpConnection.query({
                sql: query,
                values: [ts]
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
}

module.exports = TrophyScoreController;
