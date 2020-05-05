const playerController = new (require('../controllers/PlayerController'))();
const playerRouter = require('koa-router')({
    prefix: '/player'
});

playerRouter.get('/', playerController.players);
playerRouter.get('/:player', playerController.player);
playerRouter.post('/', playerController.addPlayer, playerController.players);
playerRouter.put('/:player', playerController.updatePlayer, playerController.player);
playerRouter.delete('/:player', playerController.deletePlayer, playerController.players);

module.exports = playerRouter;
