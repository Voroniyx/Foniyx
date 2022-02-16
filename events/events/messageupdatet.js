
const client = require('../../index.js');
const { timeStamp } = require('console');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');





client.on('messageUpdate', (oldMessage, newMessage) => { // Old message may be undefined
   if (!oldMessage.author) return;
   const MessageLog = client.channels.cache.find(channel => channel.id ==='912788049384050708');
   var embed = new MessageEmbed()
   .setAuthor(newMessage.author.username)
   .setTimestamp()
   .setColor('#392B47')
   .addField('Original:', `${oldMessage}`)
   .addField('Bearbeitet:', `${newMessage}`)


   MessageLog.send({ embeds: [embed] });
})