const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const badges = require('../../badges.json');

module.exports = {
        name: "botinfo",
        aliases: ['stats'],
        category : 'info',
        description: "Zeigt dir die Stats des Bots an.",
        run: async (client, message, args, prefix) => {
        
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: f!
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setTitle('Bot\'s Statistics <:discord:918191082712473651> ')
        .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField(`<:discordstaff:918191082611814401> Client`, `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField(`<:worker:918191082876067842>  Server`, `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('2f3136');
        message.channel.send({ embeds: [embed] });
     }
}