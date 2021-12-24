const { MessageEmbed, Discord } = require('discord.js')

module.exports = {
    name : 'userinfo',
    category : 'moderation',
    description : 'Zeigt dir alle möglichen Infos zu einem User',
    aliases: ["ui"],
    run : async(client, message, args) => {
        let parts = message.content.split(" ")
        if(message.author.bot) return;
        
        const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user
        const embed = new MessageEmbed()
        .setColor('69e3e2')
        .setAuthor(`${usr.tag}`, `${usr.displayAvatarURL({dynamic: true})}`)
        .setThumbnail(`${usr.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${usr}'s Informationen`)
        .addField('**Name + ID:**', `${usr.tag}`)
        .addField('**ID:**', `${usr.id}`)
        .addField('**Nickname (Wenn vorhanden):**', `${member.nickname || `Der Benutzer hat keinen Nickname`}`)
        .addField('**Dem Server gejoined:**', `${member.joinedAt}`)
        .addField('**Discord gejoined**', `${usr.createdAt}`)
        .addField('**Bot:**', `${usr.bot}`)
        

    message.channel.send({ embeds: [embed] })
            
    }
}