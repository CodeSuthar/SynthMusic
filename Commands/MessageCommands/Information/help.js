const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");

module.exports = {
  name: "help",
  category: "Information",
  description: "to see the commands",
  usage: "!help and !help [command]",
  execute: async (message, args, client, prefix, interaction) => {
    
    let query = args.join(" ");
    
    if (query) {
      const command = client.commands.get(query)
      if (command) {
        const embed = new MessageEmbed()
        .setAuthor({ name: `${query} command information`,  iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor("RANDOM")
        .addFields(
          { name: `\u200b`, value: `\`\`\`diff\n- [] = optional argument\n\n- <> = required argument\n\n- Do NOT type these when using commands!\`\`\`` },
          { name: `Name:`, value: `\`\`\`${command.name}\`\`\`` },
          { name: `Category:`, value: `\`\`\`${command.category}\`\`\``, inline: true },
          { name: `Description:`, value: `\`\`\`${command.description}\`\`\``, inline: true },
          { name: `Usage:`, value: `\`\`\`${command.usage}\`\`\``, inline: true },
        )
        return message.reply({ embeds: [embed] })
      } else {
        return message.reply({ content: `You Need To Give A Valid Command To Get Information.` })
      }
    }

    const home = client.emoji.home;
    const info = client.emoji.info;
    const music = client.emoji.queue;
    const config = client.emoji.gear;
    
    const helpembed = new MessageEmbed()
    .setTitle(`${client.user.username}'s Help Page`)
    .setColor("RANDOM")
    .setDescription(
      `**Hey <@${message.author.id}> 👋, I'm <@969558840926437406> , A cool 😎 and music bot with Awesome Features to enhance your mood with more easier way. Find out what I can do using the Dropdown Menu below.**`
    )
    .addField("___Commands Categories are Listed Below___",  `${config} \`:\`   **Configuration**\n${info}  \`:\` **Information**\n${music}  \`:\` **Music**\n\n • Select Category From Below Menu**`)
    .setThumbnail("https://media.discordapp.net/attachments/981333937181851809/995667316463374416/unknown.png")
    .setFooter({ text: `Zeon Development 💖`, iconURL: "https://media.discordapp.net/attachments/981333937181851809/995667316463374416/unknown.png"})
    .setTimestamp()
    
    const menu = new MessageSelectMenu()
    .setCustomId('menu')
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Scroll The Help Menu!`)
    .addOptions([
      {
        label: "Home",
        description: "Home Page Of Help Menu",
        value: "home",
        emoji: home
      },
      {
        label: "Configuration",
        description: "Shows Configuration Command To Change Configuration Of Zeon",
        value: "Config",
        emoji: config
      },
      {
        label: "Information",
        description: "Show Information Commands",
        value: "Info",
        emoji: info
      },
      {
        label: "Music",
        description: "Show Music Commands",
        value: "Music",
        emoji: music
      }
    ])
    
    const Ended = new MessageSelectMenu()
    .setCustomId('menu')
    .setDisabled('true')
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Interaction Disabled!`)
    .addOptions([
      {
        label: "Can't Use It Lol",
        description: "Disabled",
        value: "disabled",
      },
    ])
    
    const row = new MessageActionRow()
    .addComponents(menu)
    
    const row2 = new MessageActionRow()
    .addComponents(Ended)
    
    const msg = await message.reply({ embeds: [helpembed], components: [row] });
    
    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      return interaction.reply({
        content: `:x: **Only ${message.author.tag} can use this interaction!**`,
        ephemeral: true,
      });
    };
    
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 60000,
      idle: 60000 / 2,
    });
    
    collector.on("collect", (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const selectedmenu = interaction.values[0];
      let _commands;
      let editEmbed = new MessageEmbed().setColor("RANDOM");

      if (selectedmenu === 'Home') {
        msg.edit({ embeds: [helpembed] })
      }
      
      if (selectedmenu === 'Config') {
        _commands = client.commands.filter((x) => x.category && x.category === "Configuration").map((x) => `\`${x.name}\``);
        editEmbed.setDescription(_commands.join(", ")).setTitle("Configuration Commands").setFooter({text: `Total ${_commands.length} Configuration Commands.`})
        msg.edit({ embeds: [editEmbed] })
      }

      if (selectedmenu === 'Info') {
        _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
        editEmbed.setDescription(_commands.join(", ")).setTitle("Information Commands").setFooter({text: `Total ${_commands.length} Information Commands.`})
        msg.edit({ embeds: [editEmbed] })
      }

      if (selectedmenu === 'Music') {
        _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
        editEmbed.setDescription(_commands.join(", ")).setTitle("Music Commands").setFooter({text: `Total ${_commands.length} Music Commands.`})
        msg.edit({ embeds: [editEmbed] })
      }
    })
    
    collector.on("end", () => {
      if (!msg) return;
      return msg.edit({ components: [] })
    })
  }
};