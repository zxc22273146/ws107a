var V = module.exports = {}

V.layout = function (title, content, ctx) {
  let user = (ctx.session || {}).user
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="/css/main.css"/>
    </head>
    <body>
    <header>
      <title>${title}</title>
      <div id="header">
          <div class="navbar" style="float:left">
            <a href="" style="color:#33FF33">${(user == null) ? '未登入' : user}</a>
            
            ${(user == null) ? '<a href="/signup">註冊</a>' : ''}
            ${(user == null) ? '<a href="/login">登入</a>' : '<a href="/logout">登出</a>'}
            ${(user != null) ? '<a href="/profile">個人檔案</a>' : ''}
            <a href="/" style="color:#33FFFF">回首頁</a>
          </div>
          <div class="navbar" style="float:right">
          <!--menuHtml-->
          <div>
              <label id="userName" style="color:white">
                
              </label>
              <i class="fa fa-caret-down"></i>
          </div>
          &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </header>
    <aside>
      <div id="leftNav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="Ui.closeNav()">&times;</a>
        <div id="menu">
          <!--sideHtml-->
        </div>
      </div>
    </aside>
    <main>
      <div id="main">
        ${content}
      </div>
    </main>
    <footer><!--footer--></footer>
    <script src="/js/ui.js"></script>
  </body>
  </html>
    `
}

V.listBoards = function (boards, ctx) {
  let list = []
  for (let board of boards) {
    list.push(`<li><a href="/${board.board}/posts">${board.board} 留言板</a></li>`)
  }
  return V.layout(`所有留言板列表`, `<ol>${list.join('\n')}</ol>`, ctx)
}

V.showLogin = function (ctx) {
  return V.layout('登入', `
  <form action="/login" method="post">
    <p><input type="text" placeholder="User" name="user"></p>
    <p><input type="password" placeholder="Password" name="password"></textarea></p>
    <p><input type="submit" value="登入"/><input type="reset" value="清除"/></p>
  </form>
  `, ctx)
}

V.showSignup = function (ctx) {
  return V.layout('註冊', `
  <form action="/signup" method="post">
    <p><input type="text" placeholder="帳號" name="user"></p>
    <p><input type="password" placeholder="輸入密碼" name="password"></textarea></p>
    <p><input type="password" placeholder="確認密碼" name="password2"></textarea></p>
    <p><input type="submit" value="註冊"/><input type="reset" value="清除"/></p>
  </form>
  `, ctx)
}

V.logout = function (ctx) {
  return V.layout('登出成功！', '登出成功', ctx)
}

V.boardLayout = function (board, title, content, ctx) {
  return V.layout(`${board} 留言板`, content, ctx)
}

V.fail = function (ctx) {
  return V.layout('失敗！', '失敗！', ctx)
}

V.success = function (ctx) {
  return V.layout('成功！', '成功！', ctx)
}

V.boardPosts = function (board, posts, ctx) {
  if (posts == null) return V.fail()
  let list = []
  for (let post of posts) {
//    list.push(`<li><a href="/${post.user}/posts">웃</a> : <a href="/${post.board}/post/${post.file}">${post.title}</a></li>`)
    list.push(`<li><a href="/${post.board}/post/${post.file}">${post.title}</a></li>`)
  }
  /*
    ${(user === ctx.session.user) ? '<p><a href="/' + user + '/post/new"><button>創建新貼文</button></a></p>' : ''}
  */
  let content = `
  <div style="float:right">
    <p><a href="/${board}/post/new"><button>創建新貼文</button></a></p>
  </div>
  <h1>${board} 總共有 <strong>${posts.length}</strong> 則貼文!</h1>
  <ol id="posts">
    ${list.join('\n')}
  </ol>
  `
  return V.boardLayout(board, '貼文列表', content, ctx)
}

/*
V.guid = function () {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    var r = Math.floor(Math.random() * 16)
    return r.toString(16)
  })
}

${V.guid()}
*/
V.showAddPost = function (board, ctx) {
  return V.boardLayout(board, '新增貼文', `
  <form action="/${board}/post" method="post">
    <p><input type="text" placeholder="Title" name="title" size="40" style="width:100%"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p>
      <input type="text" placeholder="File" name="file" size="10" value="">
      <input type="submit" value="儲存"/>
    </p>
  </form>
  `, ctx)
}

V.getPost = function (post, ctx) {
  return V.boardLayout(post.board, post.title, `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `, ctx)
}
