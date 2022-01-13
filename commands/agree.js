const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agreement')
        .setDescription('Send the user agreement message (Restricted to owner)')
        .setDefaultPermission(true),

    async execute(interaction, client) {
        const agreementBtn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('user_agreement_btn')
                    .setLabel('I agree')
                    .setStyle('SUCCESS'),
            );

        await interaction.reply({ content: `Command initiated`, components: [] });
        await interaction.deleteReply();

        await interaction.channel.send({ content: `@everyone To be granted access to the rest of the server, please read the above. \n> By clicking the 'I agree' button, you agree to follow the rules mentioned above and the common sense code of conduct.`, components: [agreementBtn] });
    }
}