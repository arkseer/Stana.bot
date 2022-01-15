const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { guild, genders } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong')
        //.setDefaultPermission(false)
        .addStringOption(option => option
                .setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    async execute(interaction, client) {
        /*
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY')
                    .setEmoji('<:enochian_gods:891850510800408586>'),
            );
        */

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .setMinValues(2)
                    .setMaxValues(3)
                    .addOptions([
                        {
                            label: 'Option 1',
                            description: 'Description of option 1',
                            value: 'first_option',
                        },
                        {
                            label: 'Option 2',
                            description: 'Description of option 2',
                            value: 'second_option',
                        },
                        {
                            label: 'Option 3',
                            description: 'Description of option 3',
                            value: 'third_option',
                        },
                    ]),
            );
        await interaction.reply({ content: 'Pong', components: [row] });
        console.log(interaction);
    },
};