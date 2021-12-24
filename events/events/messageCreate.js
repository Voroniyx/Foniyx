const client = require('../../index.js');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const clientinfo = require('../../package.json');
const Voroniyx = '863453422632173568';


client.on('messageCreate', async message =>{
    if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
        
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Wie kann ich dir helfen?')
        message.channel.send({ embeds: [embed] });
    }
    if(message.content === `<@${clientinfo.authorid}>` || message.content === `<@!${clientinfo.authorid}>`) {
        if(message.author.id == Voroniyx) return;
        const devembed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Bitte Ping nicht immer den Developer.')
        message.channel.send({ embeds: [devembed] });
    }
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send(`Du hast nicht die \`${command.UserPerms || []}\` Berechtigungn`)
        if (!message.guild.me.permissions.has(command.ClientPerms || [])) return message.channel.send(`Mir fehlt die \`${command.ClientPerms || []}\` Berechtigungn`)
}
    if(command) command.run(client, message, args) 
})