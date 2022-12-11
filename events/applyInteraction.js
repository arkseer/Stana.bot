const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { bot, dividers, roles: { applications } } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            try {
                let userId = interaction.user.id;
                let getGuild = await interaction.guild;
                let getMember = await interaction.guild.members.fetch(userId);
                const getBot = await interaction.guild.members.fetch(bot);

                // Content creator
                if (interaction.customId === 'apply_cc') {
                    function applyEmbed() {
                        const embedDescription = `Before we continue, there are a few things we need to go over\n to assure we form a great partnership benefiting both of us.\nWith you operating under our banner, we would like to keep things on a professional level and maintain a healthy level of interest.\n\nYou agreeing to partner with us, you represent the **community** indirectly and therefore adhere to our rules to ensure\n we develop a healthy environment for our audience.`;
                        const applyPost = new MessageEmbed()
                            .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                            .setColor('cf889f')
                            .setDescription(embedDescription)
                            .setImage('https://i.imgur.com/tGSh027.png');
                        
                        return applyPost;
                    }

                    const applyBtn = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('apply_cc_agree')
                                .setLabel('I agree')
                                .setStyle('SUCCESS'),
                            new MessageButton()
                                .setCustomId('apply_cc_disagree')
                                .setLabel('I disagree')
                                .setStyle('DANGER'),
                        );
                    
                    await interaction.reply({ ephemeral: true, components: [applyBtn], embeds: [applyEmbed()] });
                } else if (interaction.customId === 'apply_cc_agree') {
                    let applyDivider = getGuild.roles.cache.find(role => role.id === dividers.applications.id);
                    let applyRole = getGuild.roles.cache.find(role => role.id === applications.pending.content_creator.id);
                    
                    await getMember.roles.add(applyDivider);
                    await getMember.roles.add(applyRole);

                    await interaction.reply({ content: `Moving onto next phase of this process, please use the **/cc** command and attach all details to support your application.\nThank you for understanding.`, ephemeral: true, components: [], embeds: [] });
                } else if (interaction.customId === 'apply_cc_disagree') {
                    await interaction.reply({ content: `Thank you for showing interest in our Content creator programme, please feel free to follow this process at a later date if you reconsider your choice.`, ephemeral: true, components: [], embeds: [] });
                }
                // Editor
                if (interaction.customId === 'apply_editor') {
                    function applyEmbed() {
                        const embedDescription = `Before we continue, there are a few things we need to go over\n to assure we form a great partnership benefiting both of us.\nWith you operating under our banner, we would like to keep things on a professional level and maintain a healthy level of interest.\n\nYou agreeing to partner with us, you represent the **community** indirectly and therefore adhere to our rules to ensure\n we develop a healthy environment for our audience.`;
                        const applyPost = new MessageEmbed()
                            .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                            .setColor('cf889f')
                            .setDescription(embedDescription)
                            .setImage('https://i.imgur.com/tGSh027.png');
                        
                        return applyPost;
                    }

                    const applyBtn = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('apply_editor_agree')
                                .setLabel('I agree')
                                .setStyle('SUCCESS'),
                            new MessageButton()
                                .setCustomId('apply_editor_disagree')
                                .setLabel('I disagree')
                                .setStyle('DANGER'),
                        );
                    
                    await interaction.reply({ ephemeral: true, components: [applyBtn], embeds: [applyEmbed()] });
                } else if (interaction.customId === 'apply_editor_agree') {
                    let applyDivider = getGuild.roles.cache.find(role => role.id === dividers.applications.id);
                    let applyRole = getGuild.roles.cache.find(role => role.id === applications.pending.editor.id);
                    
                    await getMember.roles.add(applyDivider);
                    await getMember.roles.add(applyRole);

                    await interaction.reply({ content: `Moving onto next phase of this process, please use the **/editor** command and attach all details to support your application.\nThank you for understanding.`, ephemeral: true, components: [], embeds: [] });
                } else if (interaction.customId === 'apply_editor_disagree') {
                    await interaction.reply({ content: `Thank you for showing interest in our Editor programme, please feel free to follow this process at a later date if you reconsider your choice.`, ephemeral: true, components: [], embeds: [] });
                }
                // Designer
                if (interaction.customId === 'apply_designer') {
                    function applyEmbed() {
                        const embedDescription = `Before we continue, there are a few things we need to go over\n to assure we form a great partnership benefiting both of us.\nWith you operating under our banner, we would like to keep things on a professional level and maintain a healthy level of interest.\n\nYou agreeing to partner with us, you represent the **community** indirectly and therefore adhere to our rules to ensure\n we develop a healthy environment for our audience.`;
                        const applyPost = new MessageEmbed()
                            .setAuthor({ name: `\u2800`, url: ``, iconURL: getBot.displayAvatarURL() })
                            .setColor('cf889f')
                            .setDescription(embedDescription)
                            .setImage('https://i.imgur.com/tGSh027.png');
                        
                        return applyPost;
                    }

                    const applyBtn = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('apply_designer_agree')
                                .setLabel('I agree')
                                .setStyle('SUCCESS'),
                            new MessageButton()
                                .setCustomId('apply_designer_disagree')
                                .setLabel('I disagree')
                                .setStyle('DANGER'),
                        );
                    
                    await interaction.reply({ ephemeral: true, components: [applyBtn], embeds: [applyEmbed()] });
                } else if (interaction.customId === 'apply_designer_agree') {
                    let applyDivider = getGuild.roles.cache.find(role => role.id === dividers.applications.id);
                    let applyRole = getGuild.roles.cache.find(role => role.id === applications.pending.designer.id);
                    
                    await getMember.roles.add(applyDivider);
                    await getMember.roles.add(applyRole);

                    await interaction.reply({ content: `Moving onto next phase of this process, please use the **/designer** command and attach all details to support your application.\nThank you for understanding.`, ephemeral: true, components: [], embeds: [] });
                } else if (interaction.customId === 'apply_designer_disagree') {
                    await interaction.reply({ content: `Thank you for showing interest in our Editor programme, please feel free to follow this process at a later date if you reconsider your choice.`, ephemeral: true, components: [], embeds: [] });
                }

                // Designer backend: Approve / Deny
                if (interaction.customId === 'designer_app_approve') {
                    const getMessage = await interaction.message;
                    const getEmbed = await getMessage.embeds[0];
                    const getApplicant = await getEmbed.fields.find(field => field.name === 'Applicant name');

                    function getRawUser(user) {
                        return user.toString().replace(/[^0-9]/g, "");
                    }

                    const getApplicantId = getRawUser(getApplicant.value);
                    const getUser = await interaction.guild.members.fetch(getApplicantId);

                    await interaction.reply({ content: `Hello **${getUser.displayName}**,\nWe are reaching out to you bearing good news!\nYou have been accepted in our **Designer programme** and we couldn't wait to tell you sooner.\n\nOn behalf of our community I would like to extend a much deserving congratulations!`, ephemeral: true, components: [], embeds: [] });
                    await interaction.component[1].setDisabled(true);
                    //await getUser.send({ content: `${getApplicantId}`, ephemeral: true, components: [], embeds: [] });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}