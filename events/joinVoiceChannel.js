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

        if(oldChannel !== newChannel && newChannel && newChannel.id === join_channel_id) {
            const voiceChannel = await guild.channels.create(member.user.tag, {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                permissionsOverwrites: [
                    {id: member.id, allow: ["CONNECT"]},
                    {id: guild.id, deny: ["CONNECT"]}
                ]
            });

            client.voiceGenerator.set(member.id, voiceChannel.id);
            console.log(`voice channel id added to collection`);
            //await newChannel.permissionsOverwrites.edit(member, {CONNECT: false});
            //setTimeout(() => newChannel.permissionsOverwrites.delete(member), 30 * 1000);

            console.log(`connecting member to new voice channel`);
            return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
        }

        /*
        const ownedChannel = client.voiceGenerator.get(member.id);

        if(ownedChannel && oldChannel.id == ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
            client.voiceGenerator.set(member.id, null);
            oldChannel.delete().catch(() => console.error());
        }
        */
    }
}