const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

// Create an event listener for new guild members (doesn't work)
// client.on('guildMemberAdd', member => {
//   member.guild.channels.get('715638886113738832').send('**' + member.user.username + '**, has joined the server!');
// });

client.on('message', message => {
  if (message.author.bot) return; // if bot sent the message, return

  var text = message.content.toLowerCase();
  if (text.includes('huan wen')) { 	// if message has huan wen in it
	message.channel.send('huan wen~'); // otherwise send huan wen~
}
  if (text.includes('!chat')) {
    chat(message,text);
  }
});

function chat(msg, text) { // msg = message object, text is actual text of message
  text = msg.content.toLowerCase();
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    msg.channel.send("h-hello....");
  }
  else {
    msg.channel.send("i love huan wen");
  }
}

client.login('token');
