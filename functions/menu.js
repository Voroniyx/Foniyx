const chalk = require(`chalk`);
const { MessageSelectMenu, MessageActionRow, Emoji } = require(`discord.js`);
const { json } = require("stream/consumers");

const create_mh = (array) => {
    if (!array) throw new Error(chalk.red.bold(`The options were not provided! Make sure you provide all the options!`));
    if (array.length < 0) throw new Error(chalk.red.bold(`The array has to have atleast one thing to select!`));
    let select_menu;
    let id = `help-menus`;
    let menus = [];
    const emo = {
        info: "❗",
        moderation: "🛠️",
        utility: "🖥️",
        fun: "🤣",
        help: "🛠️"
        
    }
    
    array.forEach(cca => {
        let name = cca;
        let sName = `${name.toUpperCase()}`
        let tName = name.toLowerCase();
        let fName = name.toUpperCase();

        return menus.push({
            label: sName,
            description: `${tName} Befehle!`,
            value: fName,
            emoji: `${emo.help}`
            
        })
    });

    let smenu1 = new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder(`Wähle eine Kategorie`)
        .addOptions(menus)

    select_menu = new MessageActionRow()
        .addComponents(
            smenu1
        );


    return {
        smenu: [select_menu],
        sid: id
    }
}

module.exports = create_mh;