const playerRouter = require('./player');
const consoleRouter = require('./console');
const gameRouter = require('./game');
const trophyRouter = require('./trophy');
const playerConsoleRouter = require('./playerconsole');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    playerRouter.routes(),
    consoleRouter.routes(),
    gameRouter.routes(),
    trophyRouter.routes(),
    playerConsoleRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};
