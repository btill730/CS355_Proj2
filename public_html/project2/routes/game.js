const gameController = new (require('../controllers/GameController'))();
const gameRouter = require('koa-router')({
    prefix: '/game'
});

gameRouter.get('/', gameController.games);
gameRouter.get('/:game', gameController.game);
gameRouter.post('/', gameController.addGame, gameController.games);
gameRouter.put('/:game', gameController.updateGame, gameController.game);
gameRouter.delete('/:game', gameController.deleteGame, gameController.games);

module.exports = gameRouter;
