const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll the dice. Returns a random number from 1-100')
        .setDefaultPermission(true),

    async execute(interaction) {
        let rng = Math.floor(Math.random() * 100);
        const rollEmbed = new MessageEmbed()
            .setColor('#00cc96')
            .setDescription(`Ark rolls **${rng}**`);

        await interaction.reply({ content: `roll the dice`, ephemeral: false, embeds: [rollEmbed], components: [] });
    }
}