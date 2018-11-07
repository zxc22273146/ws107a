const M = module.exports = {}

const posts = []

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}

M.save = function (post) {
  let oldpost = posts[post.id]
  post.created_at = oldpost.created_at
  posts[post.id] = post
}

M.remove = function (id) {
  let post = posts[id]
  for(i=id;i<posts.length;i++){
    posts[i].id = i-1
  }
  posts.splice(id,1)
  return post
}
