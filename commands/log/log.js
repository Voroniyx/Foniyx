const client = require('../../index.js');
const { timeStamp } = require('console');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'log',
    category : 'log',
    description : 'Logging System',
    aliases: ["log"],
    run : async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('2f3136')
            .setAuthor("Foniyx")
            .setTitle('Logging System')
            .setTimestamp()
            .setFooter(`abgerufen von ${message.member.displayName}`)
            .setDescription('Im Bot ist ein System eingebaut, welches automatisch Gelöschte Nachrichten im AuditLog anzeigt, und von wem die Nachricht stammt.\n In Zukunft werden noch weiter Logging Systeme Folgen und auch die möglichkeit das Logging system zu deaktiviren, wird evt. Folgen.')
            message.channel.send({ embeds: [embed] });
            message.delete()
            
    }
}
