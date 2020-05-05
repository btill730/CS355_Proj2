const playerConsoleController = new (require('../controllers/PlayerConsoleController'))();
const playerconsoleRouter = require('koa-router')({
    prefix: '/playerconsole'
});

playerconsoleRouter.get('/', playerConsoleController.playerConsoles);
playerconsoleRouter.get('/:playerConsole', playerConsoleController.playerConsole);
playerconsoleRouter.post('/', playerConsoleController.addPlayerConsole, playerConsoleController.playerConsoles);
playerconsoleRouter.put('/:playerConsole', playerConsoleController.updatePlayerConsole, playerConsoleController.playerConsole);
playerconsoleRouter.delete('/:playerConsole', playerConsoleController.deletePlayerConsole, playerConsoleController.playerConsoles);

module.exports = playerconsoleRouter;
