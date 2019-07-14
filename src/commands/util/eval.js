const {MessageEmbed} = require('discord.js'),
	  {Command, util: {escapeRegex}, eutil} = require('elaracmdo'),
	  {exec} = require('child_process'),
	  util = require('util'),
      	  moment = require("moment"),
          ms = require("ms"),
	  time = [];
require("moment-duration-format")
module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'eval',
            aliases: [`e`, `ev`, `eva`, `code`],
			group: 'owner',
			memberName: 'eval',
			description: 'Executes JavaScript code.',
			details: 'Only the bot owner(s) may use this command.',
			ownerOnly: true,
            hidden: true,
			args: [
				{
					key: 'script',
					prompt: 'What code would you like to evaluate?',
					type: 'string'
				}
			]
		});

		this.lastResult = null;
		Object.defineProperty(this, '_sensitivePattern', { value: null, configurable: true });
	}

async run(message, args) {
	  const bot = message.client, 
			msg = message,
            client = message.client,
            lastResult = this.lastResult,
            emojis = message.client.emojis,
            channels = message.client.channels,
            guilds = message.client.guilds,
            currency = message.guild.currency,
			color = message.guild.color,
			e = new MessageEmbed(),
			Schemas = client.dbs,
			evalembed = new MessageEmbed().setAuthor(client.user.tag, client.user.displayAvatarURL()).setColor(client.util.colors.default).setTimestamp(),
			raw = {
			guild: async function(args){
				let data = await Schemas.settings.findOne({guildID: args});
				if(!data) return message.say(`No data for that server`)
				let inspected = await util.inspect(data, {depth: 2});
				if(inspected.length <= 2030){
				let embed = new MessageEmbed()
				.setDescription(`\`\`\`js\n${inspected}\`\`\``)
				.setColor(client.util.colors.default)
				.setTitle(`Raw Guild Schema`)
				return message.say(embed)
				}else{
					let link = await client.f.bin("Data", inspected, "js")
					let embed = new MessageEmbed()
					.setDescription(link)
					.setColor(client.util.colors.default)
					.setTitle(`Raw Guild Schema`)
					return message.say(embed)					
				}
			},
			user: async function(args){
				let data = await Schemas.users.findOne({userID: args});
				if(!data) return message.say(`No data for that user`)
				let inspected = await util.inspect(data, {depth: 2});
				if(inspected.length <= 2030){
					let embed = new MessageEmbed()
					.setDescription(`\`\`\`js\n${inspected}\`\`\``)
					.setColor(client.util.colors.default)
					.setTitle(`Raw User Schema`)
					return message.say(embed)
					}else{
						let link = await client.f.bin("Data", inspected, "js")
						let embed = new MessageEmbed()
						.setDescription(link)
						.setColor(client.util.colors.default)
						.setTitle(`Raw User Schema`)
						return message.say(embed)					
					}
			},
			config: async function(args){
				let data = await Schemas.config.findOne({guildID: args});
				if(!data) return message.say(`No data for that server`)
				let inspected = await util.inspect(data, {depth: 2});
				if(inspected.length <= 2030){
					let embed = new MessageEmbed()
					.setDescription(`\`\`\`js\n${inspected}\`\`\``)
					.setColor(client.util.colors.default)
					.setTitle(`Raw Server-Config Schema`)
					return message.say(embed)
					}else{
						let link = await client.f.bin("Data", inspected, "js")
						let embed = new MessageEmbed()
						.setDescription(link)
						.setColor(client.util.colors.default)
						.setTitle(`Raw Server-Config Schema`)
						return message.say(embed)					
					}
			},
			dev: async function(args){
				let data = await Schemas.dev.findOne({clientID: args});
				if(!data) return message.say(`Welp.. no developer database..`)
				let inspected = await util.inspect(data, {depth: 2});
				if(inspected.length <= 2030){
					let embed = new MessageEmbed()
					.setDescription(`\`\`\`js\n${inspected}\`\`\``)
					.setColor(client.util.colors.default)
					.setTitle(`Raw Developer Schema`)
					return message.say(embed)
					}else{
						let link = await client.f.bin("Data", inspected, "js")
						let embed = new MessageEmbed()
						.setDescription(link)
						.setColor(client.util.colors.default)
						.setTitle(`Raw Developer Schema`)
						return message.say(embed)					
					}
			}
			},
			doReply = val => {
			if(val instanceof Error) {
				evalembed.setTitle(`Callback Error`).setDescription(`\`${val}\``)
				return message.say(evalembed);
			} else {
				const result = this.makeResultMessages(val, process.hrtime(this.hrStart));
				if(Array.isArray(result)) {
					for(const item of result){
						evalembed.setTitle(`Result`).setDescription(item)
						return message.say(evalembed);
					}
				} else {
					evalembed.setTitle(`Result`).setDescription(result)
					return message.say(evalembed);
				}
			}
		};

		let hrDiff;
		try {
			const hrStart = process.hrtime();
			this.lastResult = eval(args.script);
			hrDiff = process.hrtime(hrStart);
		} catch(err) {
			evalembed.setTitle(`Error while evaluating`).setDescription(`\`\`\`diff\n- ${err}\`\`\``)
			return message.say(evalembed);
		}
		this.hrStart = process.hrtime();
		const response = this.makeResultMessages(this.lastResult, hrDiff, args.script, message.editable);
		if (msg.editable) {
            if (response instanceof Array) {
                if (response.length > 0) response = response.slice(1, response.length - 1);
                for (const re of response) msg.say(re);
                return null;
            } else {
				evalembed
				.setTitle(`Result`)
				.setDescription(response)
				.setFooter(`Executed in: ${time[0]}`)
                return message.say(evalembed);
            }
        }else{
            evalembed
            .setTitle(`Result`)
			.setDescription(response)
			.setFooter(`Executed in: ${time[0]}`)
            return message.say(evalembed);
        }
	}

	makeResultMessages(result, hrDiff, input = null, editable = false) {
		const inspected = util.inspect(result, { depth: 0 }).replace(new RegExp('!!NL!!', 'g'), '\n').replace(this.sensitivePattern, 'no u');
		if(input) {
			if(hrDiff){
			time.push(`${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`)
			}
			return `${editable ? `\`\`\`js\n${input}\`\`\`` : ''}
			\`\`\`js\n${inspected}\`\`\``;
		} else {
			if(hrDiff){
			time.push(`${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`)
			}
			return `\`\`\`js\n${inspected}\`\`\``;
		}
	}

	get sensitivePattern() {
		if(!this._sensitivePattern) {
			let pattern = '';
			if(this.client.token) pattern += escapeRegex(this.client.token);
			Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(pattern, 'gi'), configurable: false });
		}
		return this._sensitivePattern;
	}
};
