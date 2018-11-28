const M = module.exports = {}

const posts = []

const users = []
const test = []
let trigger = false

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
  post.uname = trigger
}

M.adduser = function (user) {
  flag = 0;
  test.push(user.username)
  if(test[0] == "") {
    flag = 1
  }
  for(i=0;i<users.length;i++) {
    if(user.username == users[i].username) {
      flag = 1;
    }
  }
  if(flag == 0) {
    const uid = users.push(user) - 1
    user.created_at = new Date()
    user.uid = uid
  }
  test.shift()
  console.log("users = ",users)
}

M.check = function (usercheck) {
  test.push(usercheck)
  flag = 0;
  for(i=0;i<users.length;i++) {
    if(usercheck.username == users[i].username) {
      if(usercheck.userpassword == users[i].userpassword) {
        flag = 1;
        test.shift()
        trigger = users[i].username
        console.log("username = ",trigger)
        break;
      }
    }
  }
  test.shift()
}

M.signout = function () {
  trigger = "訪客"
  return trigger
}

M.trigger = function () {
  return trigger
}

M.door1 = function (post) {
  flag = 0
  if(post.uname == trigger) {
    flag = 1
  }
}

M.door2 = function (post) {
  flag = 0
  if(post.uname == trigger) {
    flag = 1
  }
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
