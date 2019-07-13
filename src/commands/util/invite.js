const Command = require('../base'), Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            memberName: "invite",
            aliases: ["botinvite", `inv`],
            examples: [`${client.commandPrefix}invite`],
            description: "Gives you a invite for the bot.",
            throttling: {
                usages: 1,
                duration: 2
            },
            group: "bot"
        })
    }
    async run(message) {
        if(await this.client.b(this.client, message) === true) return;
        if(await this.client.m(this.client) === true && !this.client.isOwner(message.author.id)) return this.client.f.msg(message)
        if(await this.client.f.channel(this.client, message) === true) return this.client.f.cmdschannel(message);
        try{
        let links = [
            `[All Permissions](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=2137517567&scope=bot)`,
            `[Administrator Permissions](https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot)`,
            `[Moderator Permissions](https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=1543892167&scope=bot)`,
            `[Normal Permissions](https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=67488833&scope=bot)`,
            `[No Permissions](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=0&scope=bot)`
        ]
        let e = new Discord.MessageEmbed()
        .setColor(this.client.util.colors.cyan)
        .setAuthor(`Bot Invites`, this.client.user.displayAvatarURL())
        .setDescription(links.join('\n') + `\n[Support Server](${this.client.options.invite})`)
        return message.channel.send(e)
        }catch(e){
            this.client.error(this.client, message, e);
            this.client.f.logger(this.client, message, e.stack)
        }
    }
}
