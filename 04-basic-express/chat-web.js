const chatWeb = {
  chatPage: function(chat) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/css/chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${this.getUserList(chat)}
            ${this.getMessageList(chat)}
            ${this.getOutgoingSection(chat)}
          </div>
        </body>
      </html>
    `;
  },

  getUserList: function(chat) {
    return `<ul class="users">` +
      Object.values(chat.users).map(user => `
        <li>
          <div class="user">
            <span class="username">${user}</span>
          </div>
        </li>
      `).join('') +
      `</ul>`;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      chat.messages.map(message => {
        // 提供默认值以防sender是undefined
        const sender = message.sender || "Unknown";
        const avatarFilename = sender.toLowerCase().replace(/\s+/g, '-') + '.jpg'; // 替换空格为短横线，并转换为小写
        const avatarPath = `images/avatar-${avatarFilename}`;
        return `
          <li>
            <div class="message">
              <div class="sender-info">
                <img class="avatar" alt="avatar of ${sender}" src="${avatarPath}"/>
                <span class="username">${sender}</span>
              </div>
              <p class="message-text">${message.text}</p>
            </div>
          </li>
        `;
      }).join('') +
      `</ol>`;
  },
  
  getOutgoingSection: function(chat) {
    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <input type="hidden" name="username" value="Fei"/> <!-- 添加隐藏字段存储用户名 -->
          <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  }
};

module.exports = chatWeb;
