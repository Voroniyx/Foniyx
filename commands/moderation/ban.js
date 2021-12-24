const { MessageEmbed, Permissions } = require("discord.js");
const prefix = "f!"

module.exports = {
        name: "ban",
        category: "moderation",
        description: "Bannt einen User",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: ["b"],
        run: async (client, message, args) => {
            
        
        if(!message.content.startsWith(prefix)) return;
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("**Du hast nicht die Berechtigungen um Leute zu Bannen! - [BAN_MEMBERS]**");
            if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("**Ich habe nicht die Berechtigung um Leute zu bannen! - [BAN_MEMBERS]**");

            if (!args[0]) return message.channel.send('**Gib einen User zum Banne ein**')

            var banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**Der USer ist nicht auf diesem Server**");

            if (banMember.id === message.member.id) return message.channel.send("**Du kannst nicht dich selbst bannen!**")

            if (!banMember.banable) return message.channel.send("**Ich kann nicht diesen User bannen**")
            if (banMember.user.bot) return message.channel.send("**Ich kann keine Bots bannen!**")

            var reason = args.slice(1).join(" ");
            try {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Hallo, du wurdest von ${message.guild.name} für - ${reason || "No Reason!"} gebannt **`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                banMember.send({ embeds: [embed] }).then(() =>
                    banMember.ban()).catch(() => null)
            } catch {
                banMember.ban()
            }
            if (reason) {
            const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${banMember.user.username}** Wurde gebannt wegen ${reason}`)
            message.channel.send({ embeds: [embed2] });
            } else {
                const embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${banMember.user.username}** Wurde aus keinem genannten Grund gebannt`)
            message.channel.send({ embeds: [embed3] });
            }
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}