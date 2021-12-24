const { MessageEmbed } = require('discord.js');
const { timeStamp } = require('console');
const package = require('../../package.json');

module.exports = {
    name : 'members',
    category : 'serverinfno',
    description : 'Zeigt dir die Anzahl an Mitgliedern dises Servers an.',
    aliases: ["m"],
    run : async(client, message, args, guild) => {
        const embed = new MessageEmbed()
            .setColor("1c3aec")
            .setAuthor("Foniyx")
            .setTitle('Server Info')
            .setTimestamp()
            .setFooter(`abgerufen von ${message.member.displayName}`)
            .setDescription(`Die Anzahl an Mitgliedern dieses Servers: ${message.guild.members.cache.filter(m => m.user.bot).size} `)
            
            message.channel.send({ embeds: [embed] });
            
    }
}