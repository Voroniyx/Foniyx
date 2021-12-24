const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'ping',
    category : 'info',
    aliases: ["p"],
    description : 'Zeigt dir den Ping.',
    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send({ embeds: [embed] })
            msg.delete()
    }
}