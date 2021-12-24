const { MessageEmbed, Message, Client } = require('discord.js');
const { timeStamp } = require('console');
const fs = require('fs');


module.exports = {
    name : 'addtest',
    category : 'test',
    description : 'addtest',
    aliases: ["test"],
    run : async(client, message, args) => {
        
        fs.writeFile('../../badges.json', JSON.stringify(badges), (err) => {
           
        })

        
    }
}

