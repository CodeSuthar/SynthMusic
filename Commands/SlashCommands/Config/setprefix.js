const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const db = require("../../../Database/prefix.js");

module.exports = {
    name: "setprefix",
    description: "Set a custom Prefix",
    default_member_permissions: ['MANAGE_GUILD'],
    dm_permission: false,
    cooldown: 5,
    options: [
        {
            name: "prefix",
            description: "Give me a new prefix",
            required: true,
            type: ApplicationCommandOptionType.String
      }
    ],
    run: async (SynthBot, interaction, prefix) => {
        await interaction.deferReply({});
        const data = await db.findOne({ Guild: interaction.guildId });
        const pre = interaction.options.getString("prefix");

        if (!pre[0]) {
            const embed = new EmbedBuilder()
            .setDescription("Please give the prefix that you want to set")
            .setColor(client.embedColor)
            return await interaction.editReply({ embeds: [embed] });
        }
        if (pre[1]) {
            const embed = new EmbedBuilder()
            .setDescription("You can not set a prefix with a double argument")
            .setColor(client.embedColor)
            return await interaction.editReply({ embeds: [embed] });
        }
        if (pre[0].length > 3) {
            const embed = new EmbedBuilder()
            .setDescription("You can not set prefix with more than 3 characters")
            .setColor(client.embedColor)
            return await interaction.editReply({ embeds: [embed] });
        }
        if (data) {
            data.oldPrefix = prefix;
            data.Prefix = pre;
            await data.save()
            const update = new EmbedBuilder()
            .setDescription(`Your prefix has been updated to **${pre}**`)
            .setColor(client.embedColor)
            .setTimestamp()
            return await interaction.editReply({ embeds: [update] });
        } else {
            const newData = new db({
                Guild: interaction.guildId,
                Prefix: pre,
                oldPrefix: prefix
            });
            await newData.save()
            const embed = new EmbedBuilder()
            .setDescription(`Custom prefix in this server is now set to **${pre}**`)
            .setColor(client.embedColor)
            .setTimestamp()
            return await interaction.editReply({ embeds: [embed] });
        }
    }
}
