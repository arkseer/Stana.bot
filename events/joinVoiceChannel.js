const { VoiceState } = require('discord.js');
const { join_channel_id } = require('../config.json');

module.exports = {
    name: "voiceStateUpdate",
    /**
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async execute(oldState, newState, client) {
        const wait = require('util').promisify(setTimeout);
        const { member, guild } = newState;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const joinChannel = "1038644009381408788";

        console.log(`user updated voice channels`);

        if(oldChannel !== newChannel && newChannel && newChannel.id === joinChannel) {
            const voiceChannel = await guild.channels.create(`New channel #1`, {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                userLimit: 5
            });

            client.voiceGenerator.set(member.id, voiceChannel.id);
            
            await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
            setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

            return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
        }

        const ownedChannel = client.voiceGenerator.get(member.id);

        if(ownedChannel && oldChannel.id == ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
            client.voiceGenerator.set(member.id, null);
            await wait(5000);
            oldChannel.delete().catch(() => {});
        }
    }
}