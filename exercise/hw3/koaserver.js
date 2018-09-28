const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  if(ctx.url == "/hello"){
    console.log(ctx.url);
    ctx.body = "你好";
  }
  else if(ctx.url == "/name"){
    console.log(ctx.url);
    ctx.body = "馮志揚";
  }
  else if(ctx.url == "/id"){
    console.log(ctx.url);
    ctx.body = "110510524";
  }
  else
    ctx.status = 404;
});

if (!module.parent) app.listen(3000);