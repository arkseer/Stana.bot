const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { bot, url,  } = require('../config.json');

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
                .setDescription(`Description goes here`)
                .setImage('https://i.imgur.com/m1p36YF.png');

            return supportPost;
        }

        const supportBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Patreon')
                    .setStyle('LINK')
                    .setURL('https://dmlc.store'),
                new MessageButton()
                    .setLabel('Merch store')
                    .setStyle('LINK')
                    .setURL('https://dmlc.store'),
            );

        let _supportEmbed = supportEmbed();

        await interaction.reply({ content: `it works`, ephemeral: true, components: [supportBtn], embeds: [_supportEmbed] });

        // Send DM to user
        //await interaction.user.send({ content: `Hello${getGender}! At this moment the best way to support our community is through boosts.\nKeep an eye on future updates if you wish to show your support through different avenues.\n\nThank you!`, components: [] });
    }
}