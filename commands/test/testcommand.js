const prefix = "f!"
module.exports = {
    name: "test",
    aliases: ["t"],
    UserPerms: ["KICK_MEMBERS"], //User Permissions Here
    ClientPerms: ["KICK_MEMBERS"], //Bot Permissions Here
    description: "Test Command",
    run: async(client, message, args, ) => {
      message.channel.send("Works")
    }
  }