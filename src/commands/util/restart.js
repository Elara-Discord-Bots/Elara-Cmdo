const Command  = require('../base');
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: "restart",
            aliases: ["rt"],
            memberName: "restart",
            hidden: true,
            group: "owner",
            ownerOnly: true,
            description: "Restarts the bot",
            args: [
                {
                    key: "type",
                    prompt: "What type of restart? [`1`(process), `2`(Discord)]",
                    type: "integer",
                    min: 1,
                    max: 2,
                    default: 2
                }
            ]
        })
    }
    async run(message, {type}){
        if(type === 1) return message.channel.send(`Restarting...`).then(async() => {await process.exit(1)});
        if(type === 2) return message.channel.send(`Restarting...`).then(async () => {await this.client.destroy().then(this.client.login(this.client.config.token))})
    }
}
