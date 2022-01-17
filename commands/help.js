const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { help } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of helpful commands')
        .setDefaultPermission(true),

    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor('78282f')
            .setDescription(`${help[0]} ${help[1]} ${help[2]}`);
        await interaction.reply({ content: `I'm sorry, but this feature is still under construction.`, ephemeral: true, components: [] });
    }
}