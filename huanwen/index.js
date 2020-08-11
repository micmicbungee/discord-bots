const Discord = require('discord.js');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});

const symbol = '~';

client.on('message', message => {
	//if (message.author.bot) return; // if bot sent the message, ignore
  if(message.author.id === client.user.id) return;

	var cont = message.content.slice(symbol.length).split(" "); // This variable slices off the symbol, then puts the rest in an array based off the spaces
  var args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
  var text = message.content.toLowerCase();

  if (text.includes('jiyuan')){

    message.channel.send("https://imgur.com/dXecbgt");
  }

  if (text.includes('i love huan wen')) { 	// if message has huan wen in it
    message.channel.send('I love jiyuan~');
  }

  if (text.includes('this flower looks like an umbrella'))
  {
    message.channel.send("you're right");
  }

  if (text.startsWith(symbol + 'chat')) { // if message has command !chat
    chat(message,text);
  }




  	if (text.startsWith(symbol + 'commands')){ // if message has command !commands
  	//	message.channel.send("List of commands available:\n!chat - use this to chat with the bot\n!weather (insert city) - use this to check the weather\n!play (insert Youtube link) - use this to play music\n!skip - use this to skip the current song\n!stop - use this to stop the current song");

  		const embed = new Discord.MessageEmbed()
  		.setTitle("List of commands available:")
  		.setColor(0xF9C3D9)
  		.addField('~chat', '- use this to chat with the bot')
  		message.channel.send(embed);

  	}
});

// for chat command
function chat(msg, text) { // msg = message object, text is actual text of message
  text = msg.content.toLowerCase();
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    msg.channel.send("Hello");
  }
  else {
    msg.channel.send("Do you need something?");
  }

}



client.login('token');
