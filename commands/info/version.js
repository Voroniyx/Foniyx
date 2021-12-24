const { MessageEmbed } = require('discord.js');
const { timeStamp } = require('console');
const package = require('../../package.json');
const version = '1.1.0';
const beta = ' 3.4.10';

module.exports = {
    name : 'version',
    category : 'info',
    description : 'Zeigt dir die Entwicklungs version an.',
    aliases: ["vs"],
    run : async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("1c3aec")
            .setAuthor("Voroniyx")
            .setTitle('Version')
            .setTimestamp()
            .setFooter(`abgerufen von ${message.member.displayName}`)
            .addField(`<:Discord_settings:918191082993512518>  Version`,`${version} `)
            .addField(`<:Discord_settings:918191082993512518>  Entwicklungs Version`,`${beta}`)
            
            message.channel.send({ embeds: [embed] });
            
    }
}