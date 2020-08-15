const Discord = require('discord.js');
const weather = require('weather-js');
const ytdl = require('ytdl-core');
const prism = require('prism-media');
//const opus = require('@discordjs/opus');

const client = new Discord.Client();

const symbol = '!'; // symbol associated with all of jiyuan's commands
const queue = new Map(); // music queue

client.once('ready', () => {
	console.log('Ready!');
});

// Server greeting (from https://discord.js.org/#/docs/main/stable/examples/greeting)
client.on('guildMemberAdd', member => {
	// find general channel
  const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
  if (!channel) return; // if channel not found, do nothing
  channel.send(`w-welcome, ${member}~`);
});

// message events
client.on('message', message => {
  if (message.author.id === client.user.id) return; // if jiyuan sent the message, ignore

  var cont = message.content.slice(symbol.length).split(" "); // array filed with words of the message, not including the symbol
  var args = cont.slice(1); // array of arguments after command
  var text = message.content.toLowerCase();

  if (text.includes('huan wen')) { // if message has huan wen in it
    message.channel.send('huan wen~');
  }

  if (text.startsWith(symbol + 'chat')) { // if message has command !chat
    chat(message,text);
  }

  if (text.startsWith(symbol + 'commands')){ // if message has command !commands
    const embed = new Discord.MessageEmbed()
      .setTitle("List of commands available:")
      .setColor(0xF9C3D9)

      .addField('!chat', '- use this to chat with the bot')
      .addField('!weather (insert city)', '- use this to check the weather')
      .addField('!play(insert Youtube link)', '- use this to play music')
      .addField('!skip', '- use this to skip the current song')
      .addField('!stop', '- use this to stop the current song')
    message.channel.send(embed);
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
    var current = result[0].current; // current part of the JSON output
    var location = result[0].location; // location part of the JSON output

    const embed = new Discord.MessageEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}!`)
      .setThumbnail(current.imageUrl)
      .setColor(0xc0fff4)

      .addField('Timezone',`UTC${location.timezone}`, true)
      .addField('Degree Type',location.degreetype, true)
      .addField('Temperature',`${current.temperature} Degrees`, true)
      .addField('Feels Like', `${current.feelslike} Degrees`, true)
      .addField('Winds',current.winddisplay, true)
      .addField('Humidity', `${current.humidity}%`, true)

    message.channel.send({embed});
   });
  }

	// below are commands for music function
  const serverQueue = queue.get(message.guild.id);

  if (text.startsWith(symbol + 'play')) {
    execute(message, serverQueue, args);
    return;
  }
  else if (message.content.startsWith(symbol + 'skip')) {
    skip(message, serverQueue);
    return;
  }
  else if (message.content.startsWith(symbol + 'stop')) {
    stop(message, serverQueue);
    return;
  }
});

// functions

// for chat command
function chat(msg, text) { // msg = message object, text is actual text of message
  text = msg.content.toLowerCase();
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    msg.channel.send("h-hello....");
  }
	if (text.includes("flower")) {
		msg.channel.send("look! this flower looks like an umbrella");
	}
  else {
    msg.channel.send("i love huan wen");
  }
}

// functions for music

// the below were taken from https://gabrieltanner.org/blog/dicord-music-bot (with minor edits)
async function execute(message, serverQueue, args) {
  // const args = message.content.split(" ");
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send(
      "Sorry...you need to be in a voice channel to play music....."
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I-I need the p-permissions to join and speak in your voice channel...."
    );
  }

  const songInfo = await ytdl.getInfo(args[0]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true
    };

    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue~~~~`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music..."
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could s-skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music...sorry..."
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  // const input = await ytdl(song.url);
  // const pcm = input.pipe(new prism.opus.Decoder({ rate: 48000, channels: 2, frameSize: 960 }));
  // const dispatcher = connection.playConvertedStream(pcm);
  const dispatcher = serverQueue.connection
    options = {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25};
    dispatcher.play(ytdl(song.url, options))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
    // dispatcher.setVolume(0.5);
    serverQueue.textChannel.send(`Start playing: **${song.title}** ~`);
}

client.login('token');
