const Discord = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js');


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

const symbol = '!'; // symbol associated with all of this bot's commands

client.on('message', message => {
	if (message.author.bot) return; // if bot sent the message, ignore

	var cont = message.content.slice(symbol.length).split(" "); // This variable slices off the symbol, then puts the rest in an array based off the spaces
  var args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
  var text = message.content.toLowerCase();


  if (text.includes('huan wen')) { 	// if message has huan wen in it
	message.channel.send('huan wen~');
}


  if (text.startsWith(symbol + 'chat')) { // if message has command !chat
    chat(message,text);
  }


	if (text.startsWith(symbol + 'weather')) {
		weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
					// if no location is specified
					 if (err) {
						 message.channel.send("Oops! P-Please input a location!");
						 return;
					 }

					 // if a place they enter is invalid.
					 if (result.length === 0) {
							 message.channel.send("S-Sorry, but I couldn't find that location...")
							 return;
					 }

					 // Variables
					 var current = result[0].current; // This is a variable for the current part of the JSON output
					 var location = result[0].location; // This is a variable for the location part of the JSON output

					 const embed = new Discord.MessageEmbed()
							 .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like
							 .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
							 .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
							 .setColor(0x00AE86) // This sets the color of the embed
							 .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
							 .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
							 .addField('Temperature',`${current.temperature} Degrees`, true)
							 .addField('Feels Like', `${current.feelslike} Degrees`, true)
							 .addField('Winds',current.winddisplay, true)
							 .addField('Humidity', `${current.humidity}%`, true)

							 message.channel.send({embed});
			 });


	}


});

// functions

// for chat command
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
