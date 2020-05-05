const trophyScoreController = new (require('../controllers/TrophyScoreController'))();
const trophyscoreRouter = require('koa-router')({
    prefix: '/trophyscore'
});

trophyscoreRouter.get('/', trophyScoreController.trophyScores);
trophyscoreRouter.get('/:trophyScore', trophyScoreController.trophyScore);

module.exports = trophyscoreRouter;
