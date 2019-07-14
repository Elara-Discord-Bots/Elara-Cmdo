const Command  = require('../base');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            group: 'bot',
            memberName: 'uptime',
            description: 'Shows the uptime for the bot',
            examples: [`${client.commandPrefix}uptime`],
            aliases: [],
	          guildOnly: false,
            throttling: {
                usages: 1,
                duration: 2
            },
        });
    }

    async run(msg) {
	   try{
	      if(await this.client.b(this.client, msg) === true) return;
        if(await this.client.m(this.client) === true && !this.client.isOwner(msg.author.id)) return this.client.f.msg(msg)
        if(await this.client.f.channel(this.client, msg) === true) return this.client.f.cmdschannel(msg);
        let embed = new Discord.MessageEmbed()
            .setColor('#00ffe9')
            .setTitle(`${this.client.util.emojis.robot} Uptime ${this.client.util.emojis.robot}`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL())
            .setDescription(`${moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}`)
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
        msg.channel.send(embed);
	       }catch(e){
        this.client.error(this.client, msg, e);
        this.client.f.logger(this.client, msg, e.stack)
    }
    }
};
