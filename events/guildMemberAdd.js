const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { core_roles } = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        try {
            let role = member.guild.roles.cache.find(role => role.id === core_roles['n_members']);

            const welcomeMessage = `Hello there!\nI am **Stana**, **DMLC**'s secretary and I will be your guide today.\n\nOn behalf of our humble community hub I would like to extend you a warm welcome.\nWe are honored to have someone of your status joining us, and I do hope you enjoy your time here.\n\nFirst I would like to address you properly in the future; please be kind to choose one of the following for me.`;
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

            console.log(`[Log] A new member has joined! (${member.user.tag})`);
            await member.send({ content: welcomeMessage, components: [] });
            await member.roles.add(role);
        } catch (error) {
            console.error(error);
        }
    },
};