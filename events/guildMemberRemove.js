const { log_channel_id } = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',

    async execute(member) {
        try {
            let getLogChannel = member.guild.channels.cache.get(log_channel_id);

            console.log(`[Log] A member has left! (${member.user.tag} + ${member.user.username})`);
            await getLogChannel.send({ content: `[Log] [-] ${member.user.tag} has left the server.`, components: [] });
        } catch (error) {
            console.error(error);
        }
    }
}