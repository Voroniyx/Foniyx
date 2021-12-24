const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'say',
    category : 'fun',
    aliases: ["s"],
    description : 'Sagt etwas, was du vorgibst.',
    run : async(client, message, args) => {
        var text = message.content.split(" ").slice(1).join(" ");
        message.delete();
        message.channel.send(text)
    }
}
/*
if (!message.author.id.includes(`${package.id}`)) return message.channel.send(`Das kann nur ${package.author}!`)
        var text = message.content.split(" ").slice(1).join(" ");
        message.delete();
        message.channel.send(text)
*/