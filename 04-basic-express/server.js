const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});


// Below includes an example of pulling fields from a POST request body
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  // Fill in here - Do not return HTML, just update server data
  // 注意：这里应该从表单中获取'username'和'text'
  const { username, text } = req.body;
  chat.addMessage({ sender: username, text });
  res.redirect('/'); // Redirect to the home page
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
