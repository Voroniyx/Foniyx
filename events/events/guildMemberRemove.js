const client = require("../../index.js");
const { MessageEmbed } = require('discord.js');

client.on('guildMemberRemove', async(member) => {
  const Channel = member.guild.channels.cache.get('912788049384050708')
  const embed = new MessageEmbed()
  .setColor("RED")
  .setTitle("Mitglied hat verlassen")
  .setDescription(`**${member.displayName}** hat  ${member.guild.name} verlassen, wir haben jetzt ${member.guild.memberCount} Mitglieder`)
  Channel.send({ embeds: [embed] })
})