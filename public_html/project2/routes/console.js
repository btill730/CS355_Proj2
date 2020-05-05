const consoleController = new (require('../controllers/ConsoleController'))();
const consoleRouter = require('koa-router')({
    prefix: '/console'
});

consoleRouter.get('/', consoleController.consoles);
consoleRouter.get('/:console', consoleController.console);
consoleRouter.post('/', consoleController.addConsole, consoleController.consoles);
consoleRouter.put('/:console', consoleController.updateConsole, consoleController.console);
consoleRouter.delete('/:console', consoleController.deleteConsole, consoleController.consoles);

module.exports = consoleRouter;
