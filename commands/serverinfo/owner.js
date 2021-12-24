const { MessageEmbed } = require('discord.js');
const { timeStamp } = require('console');
const package = require('../../package.json');
const badges = require('../../badges.json');

module.exports = {
    name : 'owner',
    category : 'serverinfo',
    description : 'Zeigt dir denn Owener das Server an.',
    aliases: ["o"],
    run : async(client, message, args, guild) => {
        const ownerembed  = new MessageEmbed()
        .setColor('RED')
        .setDescription('Dieser Befhel wird überarebeitet.')
        const embed = new MessageEmbed()
            .setColor("1c3aec")
            .setAuthor("Foniyx")
            .setTitle('Owner')
            .setTimestamp()
            .setFooter(`abgerufen von ${message.member.displayName}`)
            .setDescription(`Der Owner diese Servers ist:`, `${message.guild.owner} <:special:913352267678240808>`)
            
            
            message.channel.send({ embeds: [ownerembed] });
            
    }
}