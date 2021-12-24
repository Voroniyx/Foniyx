const { MessageEmbed, Permissions } = require('discord.js')
const { timeStamp } = require('console')

module.exports = {
    name : 'rules',
    category : 'moderation',
    description : 'Standart Regeln',
    aliases: ["rules"],
    run : async(client, message, args) => {
        
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("**Du hast nicht die Berechtigung um diesen Befehl zu benutzen**");
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('<:Discord_rules:918191082704080936> Rules')
            .setTimestamp()
            .addField('1)','Please respect and follow everything put under the Discord Terms of Service and Community Guidelines.')
            .addField('2)','Staff members have jurisdiction over all situations on the server. Do not argue with a staff member about their decision-making.')
            .addField('3)','Spamming by sending repetitive messages, emojis, images, or reactions is not tolerated in this server or in DMs. ')
            .addField('4)',' Be appropriate. Under no circumstances, do we allow NSFW content. Keep negativity to a strict minimum.')
            .addField('5)',' For topic-specific chats, make sure you’re responding in the correct channel.')
            .addFields(
                { name: '⇩⇩⇩', value: '[ToS](https://discord.com/terms#:~:text=%20Discord%20Terms%20of%20Service%20%201%20INTRODUCTION,users%20of%20the%20Service%20and%20other...%20More%20)', inline: true },
                { name: '⇩⇩⇩', value: '[Communtiy Guidelines](https://discord.com/guidelines)', inline: true },
            )
            message.channel.send({ embeds: [embed] });
            
    }
}
