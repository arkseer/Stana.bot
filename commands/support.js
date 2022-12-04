const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { bot, url } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Ways you can help support the community'),

    async execute(interaction) {
        const wait = require('util').promisify(setTimeout);
        const getBot = await interaction.guild.members.fetch(bot);

        function supportEmbed() {
            const supportPost = new MessageEmbed()
                .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                .setColor('cf889f')
                .setDescription(`Currently we have a couple ways for our members to support our cause.\nThrough the boosting of our server, becoming a patron or buying merch from our store.\n\u2800\nWhether you choose to support us or not, we are forever grateful for your presence in our community.`)
                .setImage('https://i.imgur.com/m1p36YF.png');

            return supportPost;
        }

        const supportBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(url.patreon.name)
                    .setStyle('LINK')
                    .setURL(url.patreon.link),
                new MessageButton()
                    .setLabel(url.merch.name)
                    .setStyle('LINK')
                    .setURL(url.merch.link),
            );

        let _supportEmbed = supportEmbed();

        await interaction.reply({ ephemeral: true, components: [supportBtn], embeds: [_supportEmbed] });

        // Send DM to user
        //await interaction.user.send({ content: `Hello${getGender}! At this moment the best way to support our community is through boosts.\nKeep an eye on future updates if you wish to show your support through different avenues.\n\nThank you!`, components: [] });
    }
}