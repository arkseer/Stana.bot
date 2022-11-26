const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { core_roles, welcome_channel_id } = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        try {
            let role = member.guild.roles.cache.find(role => role.id === core_roles['n_members']);
            let getName = member.displayName();

            const welcomeMessage = `Hello there, ${getName}!\nMy name is **Stana** and I will be your guide today on behalf of the **DMLC** community.\n\nFirstly I would like to extend you a warm welcome, we are truly honored to have someone of your stature joining us.\nIt gives me great pleasure to make your acquaintance, and hope you enjoy your time here.\n\nTo complete your joining process and be granted access to the rest of the community, please navigate to the <#${welcome_channel_id}> channel to familiarize yourself with our rules.`;
            const genderChoice = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('dm_gender_male')
                        .setLabel('Male')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('dm_gender_female')
                        .setLabel('Female')
                        .setStyle('SECONDARY'),
                );

            console.log(`[Log] A new member has joined! (${member.user.tag} + ${member.user.username})`);
            await member.send({ content: welcomeMessage, components: [] });
            await member.roles.add(role);
        } catch (error) {
            console.error(error);
        }
    },
};