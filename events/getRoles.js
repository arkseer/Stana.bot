const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, genders, platforms, games, d2_classes, solo_classes } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        if (interaction.isSelectMenu()) {
            try {
                let userId = interaction.user.id;
                let getGuild = await client.guilds.cache.get(guild);
                let getMember = await getGuild.members.fetch(userId);
                let getGender;

                // Check for gender roles to address the user properly
                if (getMember.roles.cache.some(role => role.id === genders['male'])) {
                    getGender = ", sir";
                } else if (getMember.roles.cache.some(role => role.id === genders['female'])) {
                    getGender = ", ma'am";
                } else {
                    getGender = "";
                }

                // Handle gender roles
                if (interaction.customId === 'get_roles_genders') {
                    await interaction.reply({ content: `You have been granted access${getGender}!`, ephemeral: true, components: [] });

                    // Remove all platform roles to prep the user when they re-select
                    for (let x in genders) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === genders[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = getGuild.roles.cache.find(role => role.id === genders['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (let roles of interaction.values) {
                        let getRoles = getGuild.roles.cache.find(role => role.id === genders[roles]);
                        await getMember.roles.add(getRoles);
                    }
                }
                // Handle platform roles
                else if (interaction.customId === 'get_roles_platforms') {
                    await interaction.reply({ content: `You have been granted access${getGender}!`, ephemeral: true, components: [] });

                    // Remove all platform roles to prep the user when they re-select
                    for (let x in platforms) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === platforms[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = getGuild.roles.cache.find(role => role.id === platforms['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (let roles of interaction.values) {
                        let getRoles = getGuild.roles.cache.find(role => role.id === platforms[roles]);
                        await getMember.roles.add(getRoles);
                    }
                }
                // Handle game roles
                else if (interaction.customId === 'get_roles_games') {
                    await interaction.reply({ content: `You have been granted access${getGender}!`, ephemeral: true, components: [] });

                    // Remove all game roles to prep the user when they re-select
                    for (let x in games) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === games[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = getGuild.roles.cache.find(role => role.id === games['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (let roles of interaction.values) {
                        let getRoles = getGuild.roles.cache.find(role => role.id === games[roles]);
                        await getMember.roles.add(getRoles);
                    }
                }
                // Handle Destiny 2 class roles
                else if (interaction.customId === 'get_roles_d2classes') {
                    await interaction.reply({ content: `You have been granted access${getGender}!`, ephemeral: true, components: [] });

                    // Remove all class roles to prep the user when they re-select
                    for (let x in d2_classes) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === d2_classes[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = getGuild.roles.cache.find(role => role.id === d2_classes['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (let roles of interaction.values) {
                        let getRoles = getGuild.roles.cache.find(role => role.id === d2_classes[roles]);
                        await getMember.roles.add(getRoles);
                    }
                }
                // Handle Swords of Legends Online class roles
                else if (interaction.customId === 'get_roles_soloclasses') {
                    await interaction.reply({ content: `You have been granted access${getGender}!`, ephemeral: true, components: [] });

                    // Remove all class roles to prep the user when they re-select
                    for (let x in solo_classes) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === solo_classes[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = getGuild.roles.cache.find(role => role.id === solo_classes['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (let roles of interaction.values) {
                        let getRoles = getGuild.roles.cache.find(role => role.id === solo_classes[roles]);
                        await getMember.roles.add(getRoles);
                    }
                }
            } catch (error) { 
                console.error(error);
            }
        }
    }
}