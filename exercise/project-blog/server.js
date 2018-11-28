const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
  .get('/list', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .get('/edit/:id', edit)
  .get('/delete/:id', remove)
  .post('/save/:id', save)
  .post('/post', create)
  .get('/', login)
  .get('/signup', signup)
  .post('/newuser', newuser)
  .post('/check', check)
  .get('/signout', signout)

app.use(router.routes())

async function list (ctx) {
  const posts = M.list()
  const trigger = M.trigger()
  ctx.body = await V.list(posts,trigger)
}

async function add (ctx) {
  ctx.body = await V.new()
}

async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}

async function edit (ctx) {     //編輯貼文
  const id = ctx.params.id
  const post = M.get(id)
  M.door1(post)
  if (!post) ctx.throw(404, 'invalid post id')
  if(flag == 1) {
    ctx.body = await V.edit(post)
  }
  else
    ctx.redirect('/list')
}

async function remove (ctx) {   //刪除貼文
  const id = ctx.params.id
  const post = M.get(id)
  M.door2(post)
  if(flag == 1){
    const id = ctx.params.id
    const post = M.remove(id)
    if (!post) ctx.throw(404, 'invalid post id')
    ctx.redirect('/list')
  }
  else
    ctx.redirect('/list')
}

async function save (ctx) {     //保存修改
  const id = ctx.params.id
  const oldpost = M.get(id)
  const post = ctx.request.body
  oldpost.title = post.title
  oldpost.body = post.body
  M.save(oldpost)
  ctx.redirect('/list')
}

async function create (ctx) {
  const post = ctx.request.body
  M.add(post)
  ctx.redirect('/list')
}

async function login (ctx) {      //登入
  ctx.body = await V.login()
}

async function signup (ctx) {     //註冊
  ctx.body = await V.signup()
}

async function signout (ctx) {    //登出
  M.signout()
  ctx.redirect('/')
}

async function newuser (ctx) {    //檢查註冊
  const user = ctx.request.body
  M.adduser(user)
  if(flag == 0) {
    ctx.redirect('/')
  }
  else ctx.redirect('/signup')
}

async function check (ctx) {      //檢查登入
  const usercheck = ctx.request.body
  M.check(usercheck)
  if(flag == 1) {
    ctx.redirect('/list')
  }
  else 
    ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
