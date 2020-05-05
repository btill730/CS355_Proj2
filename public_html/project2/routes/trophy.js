const trophyController = new (require('../controllers/TrophyController'))();
const trophyRouter = require('koa-router')({
    prefix: '/trophy'
});

trophyRouter.get('/', trophyController.trophies);
trophyRouter.get('/:trophy', trophyController.trophy);
trophyRouter.post('/', trophyController.addTrophy, trophyController.trophies);
trophyRouter.put('/:trophy', trophyController.updateTrophy, trophyController.trophy);
trophyRouter.delete('/:trophy', trophyController.deleteTrophy, trophyController.trophies);

module.exports = trophyRouter;
