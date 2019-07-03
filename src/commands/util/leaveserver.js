const Command  = require('../base');
module.exports = class LSCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaveserver",
            group: 'owner',
            hidden: true,
            ownerOnly: true,
            aliases: ["ls"],
            description: "Makes the bot leave the server",
            examples: [`${client.commandPrefix}leaveserver <Server ID>`],
            memberName: "leaveserver",
            args: [{
                key: "server",
                prompt: "What server do you want me to leave?",
                type: "string"
            }]
        })
    }
    async run(message, { server }) {
        let guild = this.client.guilds.get(server);
        if(!guild) return message.channel.send(`I ain't in that server!`)
            guild.leave().then(async () => {
                await message.channel.send({embed: {
                    description: `${this.client.util.emojis.semoji} I have left ${guild.name}`,
                    color: 0xFF000
                }})
            })
    
    }
}
