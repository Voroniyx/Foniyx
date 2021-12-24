const client = require('../../index.js');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const clientinfo = require('../../package.json');
const Voroniyx = '863453422632173568';

client.on('messageCreate', async message =>{
    if(message.content === `Hallo` || message.content === `hallo`) {
        
        message.channel.send(`Hallo <@${message.author.id}>`);
    }
    if(message.content === `Moin` || message.content === `moin`) {
        
        message.channel.send(`Hey <@${message.author.id}>`);
    }
    if(message.content === `Servus` || message.content === `servus`) {
        
        message.channel.send(`Servus <@${message.author.id}>`);
    }
    if(message.content === `GuMo` || message.content === `gumo`) {
        
        message.channel.send(`Guten Morgen <@${message.author.id}>`);
    }
    if(message.content === `Hey` || message.content === `hey`) {
        
        message.reply(`Guten Tag`);
    }
})