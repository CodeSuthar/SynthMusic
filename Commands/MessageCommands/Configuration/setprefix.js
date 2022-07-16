const { MessageEmbed } = require("discord.js");
const db = require("../../../Database/prefix.js");

module.exports = {
  name: "setprefix",
  category: "Configuration",
  description: "Set Custom Prefix",
  usage: "setprefix <prefix to set>",
  aliases: ["prefix"],
  execute: async (message, args, client, prefix) => {
    
    const data = await db.findOne({ Guild: message.guildId});
    const pre = await args.join(" ")
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply(`Hey Buddy, I need \`MANAGE_GUILD Or ADMINISTRATOR\` permissions to execute this command!`);
    if (!pre[0]) {
    const embed = new MessageEmbed()
        .setDescription("Please give the prefix that you want to set!")
        .setColor("RANDOM")
      return message.reply({ embeds: [embed] });
    }
    
    if (pre[0].length > 5) {
      const embed = new MessageEmbed()
      .setDescription("You can not send prefix more than 5 characters")
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] });
    }
    
    if(data) {
      data.Prefix = pre;
      await data.save()
      const update = new MessageEmbed()
      .setDescription(`Your prefix has been updated to **${pre}**`)
      .setColor("RANDOM")
      .setTimestamp()
      return message.reply({embeds: [update]});
    } else {
      const newData = new db({
        Guild : message.guildId,
        Prefix : pre
      });
      await newData.save()
      const embed = new MessageEmbed()
      .setDescription(`Custom prefix in this server is now set to **${pre}**`)
      .setColor("RANDOM")
      .setTimestamp()
      return message.reply({embeds: [embed]});
    }
  }
};