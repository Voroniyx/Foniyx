const { MessageEmbed, Permissions } = require("discord.js");
const prefix = "f!"

module.exports = {
        name: "kick",
        category: "moderation",
        description: "Kick einen User",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: ["k"],
        
        run: async (client, message, args) => {
            
        
        if(!message.content.startsWith(prefix)) return;
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("**Du hast nicht die Berechtigungen um Leute zu Kicken! - [KICK_MEMBERS]**");
            if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("**Ich habe nicht die Berechtigung um Leute zu kicken! - [KICK_MEMBERS]**");

            if (!args[0]) return message.channel.send('**Gib einen User zum kicken ein**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**User ist nicht auf diesem Server**");

            if (kickMember.id === message.member.id) return message.channel.send("**You Cannot Kick Yourself!**")

            if (!kickMember.kickable) return message.channel.send("**Ich kann diesen User nicht kicken**")
            if (kickMember.user.bot) return message.channel.send("**Ich kann diesen Bot kicken**")

            var reason = args.slice(1).join(" ");
            try {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Hallo, du wurdest auf ${message.guild.name} für - ${reason || "No Reason!"} gekickt**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send({ embeds: [embed] }).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${kickMember.user.username}** wurde gekickt für ${reason}`)
            message.channel.send({ embeds: [embed2] });
            } else {
                const embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${kickMember.user.username}** wurde aus keinem genanten Grund gekickt`)
            message.channel.send({ embeds: [embed3] });
            }
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}