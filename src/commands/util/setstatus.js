const Command = require('../base');
module.exports = class SNCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setstatus",
            memberName: "setstatus",
            group: "owner",
            ownerOnly: true,
            hidden: true,
            examples: [`${client.commnadPrefix}setstatus <Type> <Playing>`],
            aliases: [`sets`],
            description: "Sets the playing status for the bot",
            args: [
                {
                    key: "type",
                    prompt: "What is the activity going to be? [`PLAYING`, `WATCHING`, `STREAMING`, `LISTENING`]",
                    type: "string"
                },
                {
                    key: "playing",
                    prompt: "What do you want my status to be?",
                    type: "string"
                },
                {
                    key: "url",
                    prompt: "What twitch link do you want me to host?",
                    type: "string",
                    default: "https://www.twitch.tv/Discord"
                }
            ]
        })
    }
    async run(message, { type, playing, url}) {
        let t = type.toLowerCase();
        if(t === "playing"){
        this.client.user.setPresence({
            status: "online",
            game: {
                name: playing,
                type: "PLAYING"
            }
        });
        return message.channel.send(`Alright, I set my status to **${type}** and I'm ${type}: **${playing}**`)
        }else
        if(t === "watching"){
        this.client.user.setPresence({
            status: "online", 
            game: {
                name: playing,
                type: "WATCHING"
            }
        })
        return message.channel.send(`Alright, I set my status to **${type}** and I'm ${type}: **${playing}**`)
        }else
        if(t === "listening"){
        this.client.user.setPresence({
            status: "online",
            game: {
                name: playing,
                type: "LISTENING"
            }
        })
        return message.channel.send(`Alright, I set my status to **${type}** and I'm ${type} to: **${playing}**`)
        }else
        if(t === "streaming"){
            this.client.user.setPresence({status: "online", game: {
                name: playing,
                type: "STREAMING",
                url: url
            }})
            return message.channel.send(`Alright, I set my status to **${type}** and I'm ${type}: **${playing}**`)
        }else{
            return message.channel.send(`You didn't choose \`PLAYING, LISTENING, WATCHING, STREAMING\`! `)
        }
    }
}
