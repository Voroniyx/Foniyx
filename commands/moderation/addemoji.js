const { Util, MessageEmbed, Permissions } = require("discord.js");
const { parse } = require("twemoji-parser");
const Color = "RANDOM";
const prefix = "f!"

module.exports = {
  name: "addemoji",
  aliases: ["ae"],
  description: "Fügt ein Emoji zu diesem Server hin zu.",
  usage: "<emojiname> oder <link>",
  accessableby: "Administrator",
  run: async(client, message,args, ) => {
    if(!message.content.startsWith(prefix)) return;
    if(!message.member.permissions.has(Permissions.MANAGE_EMOJIS_AND_STICKERS)) {
      return message.channel.send(`**Du hast nicht die Berechtigungen um diesen Befehl zu nutzen -[MANAGE_EMOJIS_AND_STICKERS]**`)
    }
    const emoji = args[0];
    if(!emoji) return message.channel.send(`**Bitte gib mir ein Emoji, was ich hinzufügen soll.**`);
    
    let customemoji = Util.parseEmoji(emoji);
    
    if(customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
        );
        
        const Added = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Emoji wurde hinzugefügt!\nName: ${name || `${customemoji.name}`}\Vorschau: [Click Me](${Link})`);
        return message.channel.send({ embeds: [Added] });
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
      return message.channel.send(`Bitte gib mir ein verfügbares Emoji`);
      
      message.channel.send(`Du kannst kein Normale Emojis nehmen, um sie dem Server hinzuzufügen.`);
    }
  }
}