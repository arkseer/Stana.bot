const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, platforms, genders } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        if (interaction.isSelectMenu()) {
            try {
                const gamesMenu = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('dm_games_menu')
                            .setPlaceholder('Select your main game/s')
                            .setMinValues(1)
                            .setMaxValues(12)
                            .addOptions([
                                {
                                    label: 'Destiny 2',
                                    value: 'd2',
                                    emoji: '<:destiny2:892085699338203157>',
                                },
                                {
                                    label: 'Rainbow 6',
                                    value: 'r6',
                                    emoji: '<:rainbow6:892085698344149034>',
                                },
                                {
                                    label: 'Apex Legends',
                                    value: 'apex',
                                    emoji: '<:apex_legends:892085697551417375>',
                                },
                                {
                                    label: 'Red Dead Redemption 2',
                                    value: 'rdr2',
                                    emoji: '<:rdr2:892085699078148116>',
                                },
                                {
                                    label: 'GTA 5',
                                    value: 'gta',
                                    emoji: '<:gta5:892085698784550963>',
                                },
                                {
                                    label: 'Call of Duty',
                                    value: 'cod',
                                    emoji: '<:cod:892085698612580423>',
                                },
                                {
                                    label: 'Minecraft',
                                    value: 'minecraft',
                                    emoji: '<:minecraft:892085697954054214>',
                                },
                                {
                                    label: 'Final Fantasy 14',
                                    value: 'ff14',
                                    emoji: '<:ff14:892085698436399115>',
                                },
                                {
                                    label: 'New World',
                                    value: 'newworld',
                                    emoji: '<:newworld:892085699409510430>',
                                },
                                {
                                    label: 'Among Us',
                                    value: 'amongus',
                                    emoji: '<:among_us:892085698029580379>',
                                },
                                {
                                    label: 'Sword of Legends Online',
                                    value: 'solo',
                                    emoji: '<:solo:892085699673751613>',
                                },
                                {
                                    label: 'Outriders',
                                    value: 'outriders',
                                    emoji: '<:outriders:930080731231842344>',
                                },
                            ]),
                    );

                if (interaction.customId === 'dm_platforms_menu') {
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
                    await interaction.editReply({ content: `Before we part ways I would like you to select one or multiple games you are interested in.\n`, components: [gamesMenu] });

                    // Remove all games roles to prep the user when they re-select
                    for (let x in platforms) {
                        let getAllRoles = getGuild.roles.cache.find(role => role.id === platforms[x]);
                        await getMember.roles.remove(getAllRoles);
                    }

                    // Add divider role to user
                    let getDividerRole = await getGuild.roles.cache.find(role => role.id === platforms['divider']);
                    await getMember.roles.add(getDividerRole);

                    // Add selected roles to user
                    for (const getPlatform of interaction.values) {
                        let getRole = getGuild.roles.cache.find(role => role.id === platforms[getPlatform]);
                        await getMember.roles.add(getRole);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
};