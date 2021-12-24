const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "slowmode",
    category: "moderation",
    description: "Setzt einen Slowmode in den Channel",
    accessableby: "Moderator",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    aliases: ["sl"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("**Du kannst keinen Slowmode machen!**");
        if(!args[0]) {
            message.channel.setRateLimitperUser(0);
            return message.channel.send('Der Slowmode wurde entfernt.')
        }
        const raw = args[0];
        const milliseconds = ms(raw);

        if(isNaN(milliseconds)) return message.reply('Das ist keine Verfügbare Zeit!');

        if(milliseconds < 1000) return message.reply('Die mindest zwit beträgt 1 Sekunde');

        message.channel.setRateLimitperUser(milliseconds / 1000);
        message.channel.send(
            `Der Slowmode in diesem Channel ist auf ${ms(milliseconds, {
                long: true
            })}`
        )
            
    }
}