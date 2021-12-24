const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'useravatar',
    category : 'fun',
    description : 'Zeigt dir das avatar von dir',
    aliases: ["ua"],
    run : async(client, message, args) => {
        
        const embed = new MessageEmbed()
            .setTitle('Avatar')
            .setDescription(`Wird überarbeitet!`)
             
        //message.channel.send({ embeds: [embed] })

        const useravatar = new MessageEmbed()
        .setColor('RANDOM')
        .setImage(
            message.author.displayAvatarURL({
            dynamic: true
            })
        ) 
        message.channel.send({ embeds: [useravatar]})
            
    }
}