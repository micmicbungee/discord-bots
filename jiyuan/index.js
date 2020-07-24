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

const prefix = '!'; // This is the prefix, you can change it to whatever you want.

client.on('message', message => {
	let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
  let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

  if (message.author.bot) return; // if bot sent the message, ignore
  var text = message.content.toLowerCase();
  if (text.includes('huan wen')) { 	// if message has huan wen in it
	message.channel.send('huan wen~');
}
  if (text.startsWith(prefix + 'chat')) { // if message has command !chat
    chat(message,text);
  }

	if(text.startsWith(prefix + 'weather'))
	{
		weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
					 if (err) message.channel.send(err);

					 // We also want them to know if a place they enter is invalid.
					 if (result.length === 0) {
							 message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
							 return; // This exits the code so the rest doesn't run.
					 }

					 // Variables
					 var current = result[0].current; // This is a variable for the current part of the JSON output
					 var location = result[0].location; // This is a variable for the location part of the JSON output

					 // Let's use an embed for this.
					 const embed = new Discord.MessageEmbed()
							 .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
							 .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
							 .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
							 .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
							 .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
							 .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
							 .addField('Temperature',`${current.temperature} Degrees`, true)
							 .addField('Feels Like', `${current.feelslike} Degrees`, true)
							 .addField('Winds',current.winddisplay, true)
							 .addField('Humidity', `${current.humidity}%`, true)
							 // Now, let's display it when called
							 message.channel.send({embed});
			 });


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
