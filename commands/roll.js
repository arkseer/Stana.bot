const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll the dice. Returns a random number from 1-100')
        .setDefaultPermission(true),

    async execute(interaction) {
        let rng = Math.floor(Math.random() * 100);
        let getUser = interaction.user.username;

        const rollEmbed = new MessageEmbed()
            .setColor('#00cc96')
            .setDescription(`${getUser} rolls **${rng}**`);

        await interaction.reply({ embeds: [rollEmbed], components: [] });
    }
}