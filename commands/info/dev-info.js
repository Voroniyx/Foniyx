const { MessageEmbed, Message, Client } = require('discord.js');
const { timeStamp } = require('console');
const { stripIndent } = require('common-tags');
const badges = require('../../badges.json');
const devinfo = require('../../Database/devinfo.json')

module.exports = {
    name : 'devinfo',
    category : 'info',
    description : 'Zeigt dir das Team Rund um Foniyx',
    aliases: ["dev"],
    run : async(client, message, args) => {
        
          
        const developer = stripIndent`
            Owner       :: ${devinfo.developer.leader.name}
                           -> ${devinfo.developer.leader.role}
                           -> ${devinfo.developer.leader.id}
            Developer   :: ${devinfo.developer.dev.name}
                           -> ${devinfo.developer.dev.role}
                           -> ${devinfo.developer.dev.id} 
        `;
        const bughunter = stripIndent`
            Bughunter   :: ${devinfo.bughunter.firstbughunter.name}
                           -> ${devinfo.bughunter.firstbughunter.role}
                           -> ${devinfo.bughunter.firstbughunter.id}
        `;

        const developerembed = new MessageEmbed()
        .setTitle('Team')
        .setDescription('**Hinter Foniyx steht natürlich auch ein Team, welches sich viele Gedanken um den Bot gemacht hat.**')
        .setColor('2f3136')
        .addField('Developer',`\`\`\`asciidoc\n${developer}\`\`\``)
        .addField('Bug Hunter',`\`\`\`asciidoc\n${bughunter}\`\`\``)
        .setFooter(`Designed from ${devinfo.developer.dev.name} || Bot Name: ${client.user.name}`)
        .setTimestamp()
        
        message.channel.send({ embeds: [developerembed] });
    }
}


//Voroniyx#5567\n (863453422632173568)
/*
const info = new MessageEmbed()
            .setColor('2f3136')
            .setTitle('Foniyx <:greenverified:918191082838306816> ')
            .setTimestamp()
            .setFooter(`abgerufen von ${message.member.displayName}`)
            .setDescription('**Hinter Foniyx steht natürlich auch ein Team, welches sich viele Gedanken um den Bot gemacht hat.**')
            .addField(`Developer`,`<:serverowner:918191082469228545> <:developersofDiscord:918191082334994453> <:hunter:918191082729275444>  Voroniyx#4444 (ID: 863453422632173568) \n <:developersofDiscord:918191082334994453> <:hunter:918191082729275444> Poenix#9647 (ID: 913720972828352564s)`)
            .addField(`Bug Hunter`,`<:hunter:918191082729275444> </Drijon>#7577 (ID :778557320123777026)`)
            
            
*/