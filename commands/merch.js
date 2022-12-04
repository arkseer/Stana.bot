const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guild, bot, url } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('merch')
        .setDescription('Receive details about our merch store'),

    async execute(interaction, client) {
        const wait = require('util').promisify(setTimeout);
        
        let getGuild = await client.guilds.cache.get(guild);
        let getBot = await getGuild.members.fetch(bot);

        function merchEmbed() {
            const merchPost = new MessageEmbed()
                .setAuthor({ name: getBot.displayName, url: url.merch.link, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`Description goes here`)
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

        await interaction.reply({ content: `it works`, ephemeral: true, components: [merchBtn], embeds: [_merchEmbed] });
    }
}