const Command = require('../base');
const Discord = require('discord.js');
module.exports = class SCommand extends Command {
    constructor(client) {
        super(client, {
            name: "support",
            memberName: "support",
            aliases: [`botsupport`],
            examples: [`${client.commandPrefix}support`],
            description: "Gives you the invite to the support server",
            group: "bot",
            throttling: {
                usages: 1,
                duration: 2
            },
        })
    }
    async run(message) {
        if(await this.client.b(this.client, message) === true) return;
        if(await this.client.m(this.client) === true && !this.client.isOwner(message.author.id)) return this.client.f.msg(message)
        if(await this.client.f.channel(this.client, message) === true) return this.client.f.cmdschannel(message);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`Elara Support`, "https://cdn.discordapp.com/icons/499409162661396481/28c6fa39e722e2c0aea60f15ca105c1d.png?size=2048")
            .setColor(this.client.util.colors.cyan)
            .setDescription(this.client.options.invite)
        message.say(embed)
    }
}
