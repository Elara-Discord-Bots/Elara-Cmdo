const { Command } = require('../base');
const Discord = require('discord.js');
module.exports = class ShutdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shutdown",
            memberName: 'shutdown',
            group: 'owner',
            ownerOnly: true,
            hidden: true,
            description: "Shuts down the bot",
            aliases: ["st", "die"],
            examples: [`${client.commandPrefix}shutdown`]
        })
    }
    async run(message) {
        message.react(this.client.util.emojis.sreact).then(async () => {await process.exit(1)})
    }
}
