const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const { bot, roles: { activity }, faceit } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            try {
                let userId = interaction.user.id;
                let getGuild = await interaction.guild;
                let getMember = await interaction.guild.members.fetch(userId);
                const getBot = await interaction.guild.members.fetch(bot);

                if (interaction.customId === 'faceit_approve') {
                    const getMessage = await interaction.message;
                    const getEmbed = await getMessage.embeds[0];
                    const getApplicant = await getEmbed.fields.find(field => field.name === 'Applicant name');


                    let faceitRole = getGuild.roles.cache.find(role => role.id === activity.faceit.id);

                    function getRawUser(user) {
                        return user.toString().replace(/[^0-9]/g, "");
                    }

                    const getApplicantId = getRawUser(getApplicant.value);
                    const getUser = await interaction.guild.members.fetch(getApplicantId);

                    const closedBtn = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('faceit_closed')
                                .setLabel('Closed')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                        );

                    const faceitInvite = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('Faceit Hub')
                                .setStyle('URL')
                                .setURL(faceit.invite),
                        );

                    await getMessage.edit({ components: [closedBtn] });

                    await interaction.reply({ content: `Approval message sent to applicant`, ephemeral: true, components: [] });
                    await getUser.send({ content: `Congrats, you have been invited to join our Faceit hub, please find the invite URL by clicking on the button attached to this message.`, ephemeral: false, components: [faceitInvite] });

                    // Add Faceit role
                    await getMember.roles.add(faceitRole);
                } else if (interaction.customId === 'faceit_deny') {
                    const getMessage = await interaction.message;
                    const getEmbed = await getMessage.embeds[0];
                    const getApplicant = await getEmbed.fields.find(field => field.name === 'Applicant name');


                    //let faceitRole = getGuild.roles.cache.find(role => role.id === activity.faceit.id);

                    function getRawUser(user) {
                        return user.toString().replace(/[^0-9]/g, "");
                    }

                    const getApplicantId = getRawUser(getApplicant.value);
                    const getUser = await interaction.guild.members.fetch(getApplicantId);

                    const closedBtn = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('faceit_closed')
                                .setLabel('Closed')
                                .setStyle('SECONDARY')
                                .setDisabled(true),
                        );

                    await getMessage.edit({ components: [closedBtn] });

                    await interaction.reply({ content: `Denial message sent to applicant.`, ephemeral: true, components: [] });
                    await getUser.send({ content: `I am terribly sorry, but we decided to not honor your application at this time. Please try again at a later date.\nThank you!`, ephemeral: false, components: [] })
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}