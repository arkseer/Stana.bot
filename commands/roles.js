const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { emojis, emojisAgents, agents } = require('../config.json');
const { execute } = require('./help');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Send roles select menus (Restricted to owner)')
        .setDefaultPermission(false),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);

        const pingsMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_pings')
                    .setPlaceholder('Select what content you want to be pinged')
                    .setMinValues(1)
                    .setMaxValues(4)
                    .addOptions([
                        {
                            label: 'Tournaments',
                            value: 'tournaments',
                            emoji: emojis['ping_tournaments'],
                        },
                        {
                            label: 'Scrims',
                            value: 'scrims',
                            emoji: emojis['ping_scrims'],
                        },
                        {
                            label: 'Streamers',
                            value: 'streamers',
                            emoji: emojis['ping_streamers'],
                        },
                        {
                            label: 'New content',
                            value: 'new_content',
                            emoji: emojis['ping_new_content'],
                        },
                    ]),
            );
        
        const valorantClassesMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_va_classes')
                    .setPlaceholder('VALORANT: Select your main class')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Duelist',
                            value: 'duelist',
                            emoji: emojis['duelist'],
                        },
                        {
                            label: 'Initiator',
                            value: 'initiator',
                            emoji: emojis['initiator'],
                        },
                        {
                            label: 'Sentinel',
                            value: 'sentinel',
                            emoji: emojis['sentinel'],
                        },
                        {
                            label: 'Controller',
                            value: 'controller',
                            emoji: emojis['controller'],
                        },
                    ]),
            );
        
        let valorantAgentsMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('get_roles_va_agents')
                    .setPlaceholder('VALORANT: Select your main agent')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Test',
                            value: 'test',
                        },
                    ]),
            );

        valorantAgentsMenu.components[0].addOptions([
            {
                label: 'option 2',
                value: 'option 2',
            },
        ]);

            await interaction.reply({ content: `Command initiated`, ephemeral: true, components: [] });
            await wait(2000);

            await interaction.channel.send({ content: `You can select one or multiple options to be granted different benefits in the community`, ephemeral: false, components: [pingsMenu, valorantClassesMenu, valorantAgentsMenu] });
    }
}