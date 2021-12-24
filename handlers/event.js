/*
const {readdirSync} = require('fs');

module.exports = (client) => {
  readdirSync("./events/").forEach((file) => {
    const events = readdirSync("./events/").filter((file) => file.endsWith(".js"))
    for(let file of events) {
      let pull = require(`../events/${file}`);
      if(pull.name){
        client.events.set(pull.name, pull)
      } else {
        continue;
      }
    }
  })
  console.log("[EVENTS] : Event Handler is ready")
}
*/
const ascii = require('ascii-table');
let table = new ascii("Events");
table.setHeading('Events', ' Load status');
const {readdirSync} = require('fs');
const client = require("../index.js"); 
module.exports = (client) => {
  readdirSync('./events/').forEach(dir => {
      const events = readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
      for(let file of events){
          let pull = require(`../events/${dir}/${file}`);
          
          if(pull.name){
              client.events.set(pull.name, pull);
          } else {
              table.addRow(file, '✔️ -> Event Loaded')
              continue;
          }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
      }
  });
  
  console.log(table.toString());
  const { stripIndent } = require('common-tags');
  const clientStats = stripIndent`
    [DATABASE]  -> Datein werden ausgelesen.
    [LOG]       -> Startbereit.
    [READY]     -> Foniyx wurde hochgefahren und hört auf Pings.
    [COMMADNS]  -> Befehle sind Bereit
    [EVENTS]    -> Event Handler is ready
    ----
   `;

    console.log(clientStats)
  
}
