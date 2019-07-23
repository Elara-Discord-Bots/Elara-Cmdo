const Command = require('../base');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format')
module.exports = class BotinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            group: "bot",
            memberName: "botinfo",
            aliases: [`info`, `binfo`],
            description: "Gives you the bots information",
            examples: [`${client.commandPrefix}botinfo`],
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
        try{
        let prefix = message.guild ? message.guild._commandPrefix : this.client.commandPrefix;
        let bot = this.client.user;
        let botembed = new Discord.MessageEmbed()
            .setTitle(`Bot Information`)
            .setAuthor(bot.tag, bot.displayAvatarURL())
            .setColor(message.guild ? message.guild.color : this.client.util.colors.default)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField(`User Info`, `
            **User: ** ${bot} \`@${bot.tag}\` (${bot.id})
            **Avatar: **[Click Here](${bot.displayAvatarURL()})
            **Created At: **${moment(this.client.user.createdAt).format('MMMM Do YYYY, h:mm:ssa')}`, false)
            .addField(`Info`, `
            **Prefixes:** ${prefix}, ${this.client.user}
            **Mutual Servers: **${this.client.guilds.filter(g => g.members.get(message.author.id)).size}
            **Stats: ** Do \`${prefix}stats\`
            **Bot Owners: **${this.client.owners.map(c => c.tag).join(' | ')}`, true)
            .addField(`Links`, `
            [Invite](${this.client.config.links.invite})
            [Support Server](${this.client.options.invite})
            [Github](${this.client.config.links.github})
            [DBL](${this.client.config.links.dblpro})
            `, true)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        message.say(botembed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.f.logger(this.client, message, e.stack)
        }
    }
}
