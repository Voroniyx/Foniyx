const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndent } = require('common-tags');
const emojis = require("../../JSON/emoji.json")
let color = "#1c3aec";
const prefix = "f!";

const create_mh = require(`../../functions/menu.js`);
module.exports = {
    name: "help",
    aliases: [`h`],
    description: "Zeigt dir alle verfügbaren Befehle an.",
    run: async (client, message, args, ) => {
        if(!message.content.startsWith(prefix)) return;
        let categories = [];
        let cots = [];

        if (!args[0]) {
            let ignored = [
                "test",
                "funct nicht"
            ];
            const emo = {
                info: emojis.info,
                moderation: emojis.moderation,
                utility: emojis.utility,
                fun: emojis.fun
                
            }

            let ccate = [];
            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`;
                let nome = dir.toUpperCase();

                let cats = new Object();
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });
            
            const description = stripIndent`
            Standart Server Präfix ist: ${prefix} 
            Benutze das Drop-Down Menü um dir die Befehle an zeigen zulassen.
            Du kannst auch: ${prefix}help [category]
            `;
            const embed = new MessageEmbed()
                .setTitle(`Bot Befehle`)
                .setDescription(`<:Discord_settings:918191082993512518>\`\`\`asciidoc\n${description}\`\`\``)
                .addFields(categories)
                
                .setFooter(
                    `Abgerufen von ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color)

            let menus = create_mh(ccate);
            return message.reply({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );
                        const cmds = commands.map((command) => {
                            let file = require(`../../commands/${dir}/${command}`); //getting the commands again

                            if (!file.name) return "Kein Befehls Name.";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In der Entwicklung" : co.cname}`,
                                value: co.des ? co.des : `Keine Beschreibung`,
                                inline: true,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Benutze \`${prefix}help\` mit einem command namen im anhang, um mehr über diesen Befehl zu erhalten.\nFor example: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        await interaction.deferUpdate();

                        return interaction.message.edit({ embeds: [combed], components: menus.smenu})
                    };
                };
                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        } else {
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );
                    
                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);
                    if (!file.name) return "Kein Befahls Name.";
                    let name = file.name.replace(".js", "");
                    if (client.commands.get(name).hidden) return;
                    let des = client.commands.get(name).description;
                    let emo = client.commands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;
                    let obj = {
                        cname: `${emoe}\`${name}\``,
                        des
                    }
                    return obj;
                });
                let dota = new Object();
                cmds.map(co => {
                    if (co == undefined) return;
                    dota = {
                        name: `${cmds.length === 0 ? "In Entwicklung" : prefix + co.cname}`,
                        value: co.des ? co.des : `Kein Beschreibung`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Benutze \`${prefix}help\` mit einem command namen im anhang, um mehr über diesen Befehl zu erhalten.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.reply({ embeds: [combed] })
            };

            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Unbekannter Befehl! Benutze \`${prefix}help\` für eine Übersicht von allen meinen Commands!`)
                    .setColor("RED");
                return await message.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }
            const embed = new MessageEmbed()
                .setTitle("Informationen über den Befehl:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "Kein NAme für diesen Befehl."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "Keine Aliases für deisen Befehl"
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `\`${prefix}${command.name} ${command.usage}\`` :
                    `\`${prefix}${command.name}\``
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "Keine Beschreibung für diesen Befehl"
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await message.reply({
                embeds: [embed]
            });
        }
    },
}