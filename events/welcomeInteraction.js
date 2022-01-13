const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { genders, guild } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        const platformMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('dm_platforms_menu')
                    .setPlaceholder('Select your main platform/s')
                    .setMinValues(1)
                    .setMaxValues(5)
                    .addOptions([
                        {
                            label: 'Steam',
                            value: 'steam',
                            emoji: '<:steam:819509112089214987>',
                        },
                        {
                            label: 'Epic Games',
                            value: 'epic',
                            emoji: '<:epic_games:930081499099844668>',
                        },
                        {
                            label: 'Stadia',
                            value: 'stadia',
                            emoji: '<:stadia:819509100861849620>',
                        },
                        {
                            label: 'Xbox',
                            value: 'xbox',
                            emoji: '<:xbox:819509071203401728>',
                        },
                        {
                            label: 'PSN',
                            value: 'psn',
                            emoji: '<:psn:819509084150956073>',
                        },
                    ]),
            );

        if (!interaction.isButton()) return;
        if (interaction.isButton()) {
            try {
                let userId = interaction.user.id;
                let getGuild = await client.guilds.cache.get(guild);
                let getMember = await getGuild.members.fetch(userId);

                if (interaction.customId === 'dm_gender_male') {
                    await interaction.reply({ content: `Thank you, sir!`, ephemeral: true, components: [] });

                    // Remove all roles to prep the user when they re-select
                    for (let x in genders) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === genders[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = await getGuild.roles.cache.find(role => role.id === genders['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Grant user the appropriate role
                    let getMaleRole = getGuild.roles.cache.find(role => role.id === genders['male']);
                    await getMember.roles.add(getMaleRole);

                    // Edit reply and move onto next phase
                    await wait(4000);
                    await interaction.editReply({ content: `Alright.\n\nSecond we shall choose one or multiple of the following to establish your main platform/s.\n`, ephemeral: true, components: [platformMenu] });
                } else if (interaction.customId === 'dm_gender_female') {
                    await interaction.reply({ content: `Thank you, ma'am!`, ephemeral: true, components: [] });

                    // Remove all roles to prep the user when they re-select
                    for (let x in genders) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === genders[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = await getGuild.roles.cache.find(role => role.id === genders['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Grant user the appropriate role
                    let getFemaleRole = getGuild.roles.cache.find(role => role.id === genders['female']);
                    await getMember.roles.add(getFemaleRole);

                    // Edit reply and move onto next phase
                    await wait(4000);
                    await interaction.editReply({ content: `Alright.\n\nSecond we shall choose one or multiple of the following to establish your main platform/s.\n`, ephemeral: true, components: [platformMenu] });
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
};