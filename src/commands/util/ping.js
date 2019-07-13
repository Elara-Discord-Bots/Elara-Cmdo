const Command = require('../base');
const Discord = require('discord.js');
const moment = require('moment');
require("moment-duration-format");
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'bot',
            memberName: 'ping',
            description: 'Shows the ping for the bot',
            examples: ['ping'],
            aliases: ["pong", "pung"],
            guildOnly: false,
            cooldown: {
                usages: 1,
                duration: 2
            },
        });
    }

    async run(msg) {
	if(await this.client.b(this.client, msg) === true) return;
        if(await this.client.m(this.client) === true && !this.client.isOwner(msg.author.id)) return this.client.f.msg(msg)
        if(await this.client.f.channel(this.client, msg) === true) return this.client.f.cmdschannel(msg);
        try{
        let loadingembed = new Discord.MessageEmbed()
            .setColor(this.client.util.colors.cyan)
            .setDescription(`${this.client.util.emojis.eload} Loading.`)
            .setTimestamp()
        const message = await msg.channel.send(loadingembed);
        let embed = new Discord.MessageEmbed()
            .setColor(this.client.util.colors.cyan)
            .setTitle(`${this.client.util.emojis.robot} Status ${this.client.util.emojis.robot}`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL())
            .addField(`Message Latency`, `${message.createdTimestamp - msg.createdTimestamp}ms`, true)
            .addField(`API Latency`, `${Math.round(this.client.ws.ping)}ms`, true)
            .addField(`Uptime`, `${moment.duration(this.client.uptime).format(" D [Days], H [Hours], m [Minutes], s [Seconds]")}`, true)
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
        message.edit(embed);
        }catch(e){
		msg.channel.send(`Error while running command:\n${e}`)
        }
    }
};
