const { MessageEmbed, Guild } = require('discord.js');
const { timeStamp } = require('console');
const package = require('../../package.json');
const badges = require('../../badges.json');

module.exports = {
    name : 'serverinfo',
    category : 'serverinfo',
    description : 'Alle möglichen Invormationen zum Sever.',
    aliases: ["si"],
    run : async(client, message, args, guild) => {
        const embed = new MessageEmbed()
            .setColor("1c3aec")
            .setAuthor("Foniyx")
            .setTitle('Server Info')
            .setTimestamp()
            .setFooter(`abgerufen von ${message.member.displayName}`)
            .addField(`Server Name:`,`${message.guild.name}`)
            .addField(`Erstellt am:`, `${message.guild.createdAt}`)
            .addField(`Der Server hat:`,`**${message.guild.member}** Mitlider`)
            .addField(`Der Server Eigentümer ist:`,`${message.guild.owner} <:special:913352267678240808> `)
            message.channel.send({ embeds: [embed] });
            
    }
}