const Command = require('../base');
module.exports = class SNCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setname",
            memberName: "setname",
            group: "owner",
            ownerOnly: true,
            hidden: true,
            examples: [`${client.commnadPrefix}setname <Name Here>`],
            aliases: ['sn', 'setn'],
            description: "Sets the Name for the Bot Account",
            args: [
                {
                    key: "botname",
                    prompt: "What do you want the bot name to be?",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { botname }) {
            this.client.user.setUsername(botname).catch(async () => {message.channel.send(`Done. ${this.client.util.emojis.semoji}`)})
    }
}
