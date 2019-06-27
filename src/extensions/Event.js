const {CommandoClient} = require('../index');
let valid = [
    "channelCreate",
    "channelDelete",
    "channelUpdate",
    "emojiCreate",
    "emojiDelete",
    "emojiUpdate",
    "roleCreate",
    "roleDelete",
    "roleUpdate",
    "message",
    "messageDelete",
    "messageDeleteBulk",
    "messageUpdate",
    "guildCreate",
    "guildDelete",
    "guildUpdate",
    "voiceStateUpdate",
    "userUpdate",
    "guildMemberAdd",
    "guildMemberRemove",
    "guildMemberUpdate",
    "error",
    "guildBanAdd",
    "guildBanRemove",
    "guildUnavailable",
    "messageReactionAdd",
    "messageReactionRemove",
    "messageReactionRemoveAll",
    "rateLimit",
    "ready",
    "shardDisconnect",
    "shardError",
    "shardReady",
    "shardReconnecting",
    "shardResume",
    "warn",
    "webhookUpdate",
    "debug",
    "channelPinsUpdate",
    "guildIntegrationsUpdate",
    "guildMembersChunk",
    "guildMemberSpeaking",
    "invalidated",
    "presenceUpdate",
    "typingStart"
]
async function check(client, info){
    if(typeof info.name !== "string"){
        console.log(`${info.name} has to be a string!`);
        return process.exit(1)
    }
    if(!valid.includes(info.name)){
        console.log(`${info.name} isn't a discord.js event!\nAvaliable Events:\n${valid.join("\n")}`)
        return process.exit(1)
    }
    if(typeof info.enabled !== "boolean"){
        console.log(`Enabled for "${info.name}" has to be a boolean!`);
        return process.exit(1)
    }
	
}
/**
	 * @typedef {Object} Event
	 * @property {string} name - The name of the event
	 * @property {boolean} [enabled=false] - If the event should be enabled or not.
	 */

	/**
	 * @param {CommandoClient} client - The client the command is for
	 * @param {Info} info - The command information
	 */
    /**
     * 
     * @param {CommandoClient} client 
     * @param {event} event 
     * @public
     */
module.exports = class Event{
    constructor(client, event){
        check(client, event);
              /**
		 * Client that this command is for
		 * @name Command#client
		 * @type {CommandoClient}
		 * @readonly
		 */
        Object.defineProperty(this, 'client', { value: client });
        /**
         * The name of the event to run.
         * @type {string}
         */
        this.name = event.name;
        /**
         * If the event should be enabled or not.
         * @type {boolean}
         */
        this.enabled = Boolean(event.enabled) || false;
    }
    async run(client, ...args){
        throw new Error(`${this.constructor.name} doesn't have a run(client, ...args) function`)
    }
}
