const Command = require('../base');
module.exports = class SACommand extends Command {
    constructor(client) {
        super(client, {
            name: "setavatar",
            memberName: "setavatar",
            group: "owner",
            hidden: true,
            description: "Sets the avatar of the Bots Account",
            aliases: ["sa", "setav"],
            ownerOnly: true,
            args: [
                {
                    key: "url",
                    prompt: "What do you want to be the new avatar profile photo?",
                    type: "string",
                    default: message => message.attachments.first().url
                }
            ]
        })
    }
    async run(message, { url }) {
        this.client.user.setAvatar(url).then(async () => {message.channel.send(`Done. ${this.client.util.emojis.semoji}`)})
    }
}
