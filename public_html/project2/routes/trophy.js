const trophyController = new (require('../controllers/TrophyController'))();
const trophyRouter = require('koa-router')({
    prefix: '/trophy'
});

trophyRouter.get('/', trophyController.trophies);
trophyRouter.get('/:trophy', trophyController.trophy);
trophyRouter.post('/', trophyController.addTrophy, trophyController.trophies);
trophyRouter.put('/:game/:name', trophyController.updateTrophy, trophyController.trophy);
trophyRouter.delete('/:game/:name', trophyController.deleteTrophy, trophyController.trophies);

module.exports = trophyRouter;
