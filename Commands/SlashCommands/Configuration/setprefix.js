const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../../Database/prefix.js");

//SetPrefix By Blacky

module.exports = {
    name: "setprefix",
    description: "Set Custom Prefix",
    options: [
    {
      name: "prefix",
      description: "New Prefix To Set",
      required: true,
      type: "STRING"
		}
	],  
  run: async (client, interaction, prefix) => {
    if (!interaction.replied) await interaction.deferReply({ ephemeral: true });
    const data = await db.findOne({ Guild: interaction.guildId});
    const pre = interaction.options.getString("prefix");
    if (!interaction.member.permissions.has('MANAGE_GUILD')) return await interaction.editReply({ ephemeral: true, embeds: [new MessageEmbed().setColor("RANDOM").setDescription("You must have `Manage Guild` permission to use this command.")] }).catch(() => {});

    if (!pre[0]) {
      const embed = new MessageEmbed()
      .setDescription("Please give the prefix that you want to set")
      .setColor("RANDOM")
      return await interaction.editReply({ embeds: [embed] });
    }
    
    if (pre[0].length > 5) {
      const embed = new MessageEmbed()
      .setDescription("You can not send prefix more than 5 characters")
      .setColor("RANDOM")
      return await interaction.editReply({ embeds: [embed] });
    }
    
    if (data) {
      data.Prefix = pre;
      await data.save()
      const update = new MessageEmbed()
      .setDescription(`Your prefix has been updated to **${pre}**`)
      .setColor("RANDOM")
      .setTimestamp()
      return await interaction.editReply({embeds: [update]});
    } else {
      const newData = new db({
        Guild : interaction.guildId,
        Prefix : pre,
      });
      await newData.save()
      const embed = new MessageEmbed()
      .setDescription(`Custom prefix in this server is now set to **${pre}**`)
      .setColor("RANDOM")
      .setTimestamp()
      return await interaction.editReply({embeds: [embed]});
    }
  }
}
