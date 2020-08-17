const Discord = require('discord.js');
const client = new Discord.Client();


client.login("token").then(() => {
    console.log("I am ready");
    var guild = client.guilds.cache.get('id');

    var channel = guild.channels.cache.find(ch => ch.name === 'general');
    // guild && guild.channels.cache.get('id')
    // && guild.channels.cache.find(ch => ch.name === 'general')
    if(guild){
        channel.send("Remember to drink water and eat fruit >.>");
        console.log("yes");
    } else {
        console.log("nope");
        //if the bot doesn't have guild with the id guildid
        // or if the guild doesn't have the channel with id channelid
    }
    client.destroy();
});
