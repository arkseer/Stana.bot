const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, games, genders } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        if (interaction.isSelectMenu()) {
            try {
                if (interaction.customId === 'dm_games_menu') {
                    let userId = interaction.user.id;
                    let getGuild = await client.guilds.cache.get(guild);
                    let getMember = await getGuild.members.fetch(userId);
                    let getGender;

                    // Check for gender role to address the user properly
                    if (getMember.roles.cache.some(role => role.id === genders['male'])) {
                        getGender = ", sir";
                    } else if (getMember.roles.cache.some(role => role.id === genders['female'])) {
                        getGender = ", ma'am";
                    } else {
                        getGender = "";
                    }

                    await interaction.reply({ content: `You have been granted access${getGender}!`, ephemeral: true, components: [] });
                    await wait(3000);
                    await interaction.editReply({ content: `We have reached the end of the road.\n\nI would like to thank you for allowing me to assist you through this process.\nWish you a fun time out there in the wild world of gaming and do try to enjoy your stay.`, ephemeral: true, components: [] });

                    // Remove all games roles to prep the user when they re-select
                    for (let x in games) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === games[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = await getGuild.roles.cache.find(role => role.id === games['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (const getGame of interaction.values) {
                        let getRole = getGuild.roles.cache.find(role => role.id === games[getGame]);
                        await getMember.roles.add(getRole);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
};