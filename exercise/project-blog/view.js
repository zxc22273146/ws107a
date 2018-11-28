var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.list = function (posts,trigger) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/post/${post.id}">讀取貼文</a> (由 ${post.uname} 創建)</p>
    </li>
    `)
  }
  let content = `
  <h1>貼文列表  (目前使用者：${trigger})</h1>
  <p>總共有 <strong>${posts.length}</strong> 則貼文</p>
  <p><a href="/signout">登出</a></p>
  <p><a href="/post/new">創建新貼文</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.new = function () {
  return V.layout('新增貼文', `
  <h1>新增貼文</h1>
  <p>創建一則新貼文</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.edit = function (post) {
  return V.layout('編輯貼文', `
  <h1>編輯貼文</h1>
  <form action="/save/${post.id}" method="post">
    <p><input type="text" value="${post.title}" name="title"></p>
    <p><textarea name="body">${post.body}</textarea></p>
    <p><input type="submit" value="保存"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
    <a href="/edit/${post.id}">編輯貼文</a>
    <a href="/delete/${post.id}">刪除貼文</a>
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `)
}

V.login = function () {
  return V.layout('登入', `
  <h1>登入</h1>
  <h3>或<p><a href="/signup">註冊</a></p></h3>
  <form action="/check" method="post">
    <p><input type="text" placeholder="帳號" name="username"></p>
    <p><input type="text" placeholder="密碼" name="userpassword"></p>
    <p><input type="submit" value="登入"></p>
  </form>
  `)
}

V.signup = function () {
  return V.layout('註冊', `
  <h1>註冊</h1>
  <h3>或<p><a href="/">登入</a></p></h3>
  <form action="/newuser" method="post">
    <p><input type="text" placeholder="帳號" name="username"></p>
    <p><input type="text" placeholder="密碼" name="userpassword"></p>
    <p><input type="submit" value="註冊"></p>
  </form>
  `)
}