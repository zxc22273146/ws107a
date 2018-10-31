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
  .get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .get('/edit/:id', edit)
  .post('/save/:id', save)
  .post('/post', create)

app.use(router.routes())

async function list (ctx) {
  const posts = M.list()
  ctx.body = await V.list(posts)
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

async function edit (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.edit(post)
}

async function save (ctx) {
  const id = ctx.params.id
  const oldpost = M.get(id)
  const post = ctx.request.body
  oldpost.title = post.title
  oldpost.body = post.body
  M.save(oldpost)
  ctx.redirect('/')
}

async function create (ctx) {
  const post = ctx.request.body
  M.add(post)
  ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
