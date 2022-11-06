const { VoiceState } = require('discord.js');
const { join_channel_id } = require('../config.json');

module.exports = {
    name: "voiceStateUpdate",
    /**
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async execute(oldState, newState, client) {
        const { member, guild } = newState;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const joinChannel = "1038644009381408788";
        const guildID = "1038155332721066107";

        if(guild.id == guildID) {
            console.log(`same guild`);
        } else {
            console.log(`not in same guild`);
        }

        if(oldChannel !== newChannel && newChannel && newChannel.id === joinChannel) {
            const voiceChannel = await guild.channels.create(`New channel #1`, {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                permissionOverwrites: [
                    {id: member.id, allow: [Permissions.FLAGS.CONNECT]},
                    {id: guild.id, deny: [Permissions.FLAGS.CONNECT]}
                ]
            });

            client.voiceGenerator.set(member.id, voiceChannel.id);
            await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
            setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

            return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
        }

        const ownedChannel = client.voiceGenerator.get(member.id);

        if(ownedChannel && oldChannel.id == ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
            client.voiceGenerator.set(member.id, null);
            oldChannel.delete().catch(() => {});
        }
    }
}