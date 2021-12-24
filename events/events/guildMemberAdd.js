const client = require("../../index.js");
const { MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async(member) => {
  const Channel = member.guild.channels.cache.get('912788049384050708')
  const embed = new MessageEmbed()
  .setColor("GREEN")
  .setTitle("Mitglied ist beigetretn")
  .setDescription(`**${member.displayName}** ist  ${member.guild.name} gejoind, wir haben nun ${member.guild.memberCount} Mitglieder`)
  Channel.send({ embeds: [embed] })
})