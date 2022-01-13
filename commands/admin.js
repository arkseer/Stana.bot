const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Send roles messages (Restricted to owner)')
        .setDefaultPermission(true),

    async execute(interaction, client) {
        const getStarted = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('get_started')
                    .setLabel('Get Started')
                    .setStyle('SECONDARY'),
            );

        const gendersMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_genders')
                    .setPlaceholder('Select your gender')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Male',
                            value: 'male',
                            emoji: '♂️',
                        },
                        {
                            label: 'Female',
                            value: 'female',
                            emoji: '♀️',
                        },
                    ]),
            );

        const platformsMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_platforms')
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

        const gamesMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_games')
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

        const d2ClassesMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_d2classes')
                    .setPlaceholder('D2: Select your main class')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Hunter',
                            value: 'hunters',
                            emoji: '<:hunters:819509004614369301>',
                        },
                        {
                            label: 'Warlock',
                            value: 'warlocks',
                            emoji: '<:warlocks:819508981122203678>',
                        },
                        {
                            label: 'Titan',
                            value: 'titans',
                            emoji: '<:titans:819508994154037268>',
                        },
                    ]),
            );

        const soloClassesMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_soloclasses')
                    .setPlaceholder('SOLO: Select your main class')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Berserker',
                            value: 'berserker',
                            emoji: '<:berserker:931100962985238578>',
                        },
                        {
                            label: 'Spearmaster',
                            value: 'spearmaster',
                            emoji: '<:spearmaster:931100963182346270>',
                        },
                        {
                            label: 'Reaper',
                            value: 'reaper',
                            emoji: '<:reaper:931100962960068658>',
                        },
                        {
                            label: 'Summoner',
                            value: 'summoner',
                            emoji: '<:summoner:931100963517906954>',
                        },
                        {
                            label: 'Spellsword',
                            value: 'spellsword',
                            emoji: '<:spellsword:931100963153010688>',
                        },
                        {
                            label: 'Bard',
                            value: 'bard',
                            emoji: '<:bard:931100962129592321>',
                        },
                    ]),
            );

        await interaction.reply({ content: `Command initiated`, components: [] });
        await interaction.deleteReply();

        await interaction.channel.send({ content: `You can select one or multiple options to be granted access to different sections of the server:`, components: [gendersMenu, platformsMenu, gamesMenu, d2ClassesMenu, soloClassesMenu] });
    }
}