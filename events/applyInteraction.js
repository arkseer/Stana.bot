module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            try {
                // code goes here
                if (interaction.customId === 'apply_cc') {
                    await interaction.reply({ content: `it works`, ephemeral: true, components: [] });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}