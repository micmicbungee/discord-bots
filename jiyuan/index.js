const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

// Server greeting (taken from discord.js API)
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`w-welcome, ${member}~`);
});

client.on('message', message => {
  if (message.author.bot) return; // if bot sent the message, ignore
  var text = message.content.toLowerCase();
  if (text.includes('huan wen')) { 	// if message has huan wen in it
	message.channel.send('huan wen~');
}
  if (text.includes('!chat')) { // if message has command !chat
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
