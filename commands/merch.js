const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, bot, url } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('merch')
        .setDescription('Receive details about our merch store'),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        
        let getBot = await interaction.guild.members.fetch(bot);

        function merchEmbed() {
            const merchPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`Our merch store is filled with goodies and if you wish to support us while upgrading your drip, consider taking a visit over our store.`)
                .setImage('https://i.imgur.com/y0bAZc3.png');

            return merchPost;
        }

        const merchBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(url.merch.name)
                    .setStyle('LINK')
                    .setURL(url.merch.link),
            );

        let _merchEmbed = merchEmbed();
        
        await interaction.user.send({ ephemeral: false, components: [merchBtn], embeds: [_merchEmbed] });
    }
}