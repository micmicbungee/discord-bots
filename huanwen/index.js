const Discord = require('discord.js');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});

const symbol = '~';
var tasks = []; // to do list

client.on('message', message => {
  if(message.author.id === client.user.id) return;

	var cont = message.content.slice(symbol.length).split(" "); // This variable slices off the symbol, then puts the rest in an array based off the spaces
  var args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
  var text = message.content.toLowerCase();

	var argstring = ""; // this is the arguments all together in one string
	for (var i = 0; i < args.length; i++) {
		argstring = argstring + args[i] + " ";
	}

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
    chat(message, text);
  }

	if (text.startsWith(symbol + 'choose')) {
		decisions(message, args); // ~choose a | b | c
	}

	if (text.startsWith(symbol + 'add')) {
		add(message, argstring, tasks);
	}

	if (text.startsWith(symbol + 'remove')) {
		remove(message, argstring, tasks);
	}

	if (text.startsWith(symbol + 'show')) {
		show(message, tasks);
	}





  if (text.startsWith(symbol + 'commands')){ // if message has command !commands
  //	message.channel.send("List of commands available:\n!chat - use this to chat with the bot\n!weather (insert city) - use this to check the weather\n!play (insert Youtube link) - use this to play music\n!skip - use this to skip the current song\n!stop - use this to stop the current song");

  	const embed = new Discord.MessageEmbed()
  		.setTitle("List of commands available:")
  		.setColor(0xF9C3D9)
  		.addField('~chat', ' use this to chat with the bot')
			.addField('~choose (option a | option b | ... )', ' use this to have me help you decide')
			.addField('~add (task)', ' use this to add a task to your to do list')
			.addField('~remove (task)', ' use this to remove a task from your to do list')
			.addField('~show', ' use this to display the to do list')



  	message.channel.send(embed);
	}
});


// functions
// for chat command
function chat(msg, text) { // msg = message object, text is actual text of message
  text = msg.content.toLowerCase();
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    msg.channel.send("Hello");
  }
	if (text.includes("free")) {
		msg.channel.send("Sorry, I have work to do.")
	}
  else {
    msg.channel.send("Do you need something?");
  }
}
// for choose command
function decisions(msg, args) {
	var i, argslen;
	var choices = [];
	argslen = args.length;
	for (i = 0; i < argslen; i++) {
		if (args[i] != '|') {
			choices.push(args[i]);
		}
	}
	var answer = choices[Math.floor(Math.random() * choices.length)]; // randomly pick element in list
	msg.channel.send(answer);
}

// for to do list
function add(msg, argstring, tasks) {
	if (argstring == "") { //if no arguments
		msg.channel.send("you must write a task");
		return;
	}
	tasks.push(argstring);
	msg.channel.send("task added to to-do list");
}

function remove(msg, argstring, tasks) {
	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i] == argstring) {
			tasks.splice(i,1);
		}
	}
	msg.channel.send("task removed from list.")
}

function show(msg, tasks) {
	const embed = new Discord.MessageEmbed()
		.setTitle("To do list:")
		.setColor(0xA4D3EE)
	for (var i = 0; i < tasks.length; i++) {
		embed.addField(i+1, tasks[i]);
	}
	msg.channel.send(embed);
}

client.login('token');
