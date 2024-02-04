const express = require('express');// 引入express模块
const app = express();
const PORT = 3000;// 定义端口号

const chat = require('./chat');// 引入chat模块
const chatWeb = require('./chat-web');// 引入chat-web模块

app.use(express.static('./public'));// 设置静态文件目录

// Below includes an example of sending HTML as a response
app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});

// 下面是发送 HTML 作为响应的示例
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const { username, text } = req.body;
  chat.addMessage({ sender: username, text });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
