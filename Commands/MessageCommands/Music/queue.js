const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const load = require('lodash');

// Credits To BrBlacky For Queue CMD

module.exports = {
  name: "queue",
  category: "Music",
  description: "Show's The Queue",
  usage: "queue",
  aliases: ["q"],
  cooldown: 5,
  execute: async (message, args, client, prefix) => {

    let queue = client.manager.getQueue(message.guild.id);
    
    if (!message.guild.me.voice.channelId) {
      const embed = new MessageEmbed()
      .setDescription(`There's No Player In The Guild`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })  
    }

    if (!queue.nowPlaying()) {
      const embed = new MessageEmbed()
      .setDescription(`There's No Player Playing In The Guild`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })  
    }
    
    try {
      if (!queue.tracks.length) {
        const embed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
        .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
        .addField("Queued Tracks", "There Are No Queued Track To Show Here")
        .setColor("RANDOM")
        return message.reply({ embeds: [embed] })
      }

      const queuedTracks = queue.tracks.map((m, i) => 
        `${++i} - [${m.title}](${m.url}) - \`${m.duration}\``
      );
      const trackpoint = load.chunk(queuedTracks, 10);
      let queuedList = 0;
      const Page = trackpoint.map((s) => s.join('\n'))
      
      if (queue.tracks.length > 11) {
        const embed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
        .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
        .addField("Queued Tracks", `${Page[queuedList]}`)
        .setColor("RANDOM")
        .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
  
        const but1 = new MessageButton()
        .setCustomId("qbut_1")
        .setEmoji("⏮️")
        .setStyle("SECONDARY")
  
        const but2 = new MessageButton()
        .setCustomId("qbut_2")
        .setEmoji("⏭️")
        .setStyle("SECONDARY")
  
        const but3 = new MessageButton()
        .setCustomId("qbut_3")
        .setLabel(`${queuedList + 1}/${Page.length}`)
        .setStyle("SECONDARY")
        .setDisabled(true)
  
        const row = new MessageActionRow().addComponents([but1, but3, but2]);
  
        const msg = await message.reply({ embeds: [embed], components: [row] })
  
        const collector = message.channel.createMessageComponentCollector({
          filter: (interaction) => {
            if (interaction.user.id === message.author.id) { 
              return true;
            } else {
              interaction.reply({
                ephemeral: true,
                content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
              });
              return false;
            }
          },
          time: 60000 * 5,
          idle: 40000,
        });

        collector.on("end", async () => {
          msg.edit({ components: [] })
        })
  
        collector.on('collect', async (interaction) => {
          await interaction.deferUpdate().catch(() => {});
            
          if (interaction.customId === 'qbut_1') {
            queuedList = queuedList > 0 ? --queuedList : Page.length - 1;

            if (queuedList === 0) {
              const embed = new MessageEmbed()
              .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
              .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
              .addField("Queued Tracks", `${Page[queuedList]}`)
              .setColor("RANDOM")
              .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

              msg.edit({ 
                embeds: [embed],
                components: [
                  new MessageActionRow().addComponents(
                    but1,
                    but3.setLabel(`${queuedList + 1}/${Page.length}`),
                    but2
                  ),
                ], 
              })
            } else {
              const embed2 = new MessageEmbed()
              .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
              .addField("Queued Tracks", `${Page[queuedList]}`)
              .setColor("RANDOM")
              .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
  
              await msg.edit({
                embeds: [embed2],
                components: [
                  new MessageActionRow().addComponents(
                    but1,
                    but3.setLabel(`${queuedList + 1}/${Page.length}`),
                    but2
                  ),
                ],
              });
            }
          }

          if (interaction.customId === 'qbut_2') {
            queuedList = queuedList + 1 < Page.length ? ++queuedList : 0;

            if (queuedList === 0) {
              const embed = new MessageEmbed()
              .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
              .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
              .addField("Queued Tracks", `${Page[queuedList]}`)
              .setColor("RANDOM")
              .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

              msg.edit({ 
                embeds: [embed],
                components: [
                  new MessageActionRow().addComponents(
                    but1,
                    but3.setLabel(`${queuedList + 1}/${Page.length}`),
                    but2
                  ),
                ],  
              })
            } else {
              const embed1 = new MessageEmbed()
              .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
              .addField("Queued Tracks", `${Page[queuedList]}`)
              .setColor("RANDOM")
              .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
  
              await msg.edit({
                embeds: [embed1],
                components: [
                  new MessageActionRow().addComponents(
                    but1,
                    but3.setLabel(`${queuedList + 1}/${Page.length}`),
                    but2
                  ),
                ], 
              });
            }
          }
        })
      } else {
        const embed3 = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
        .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
        .addField("Queued Tracks", `${Page[queuedList]}`)
        .setColor("RANDOM")
        .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

        return message.reply({ embeds: [embed3] });
      }
    } catch (e) {
      console.log(e)
      return message.reply({ content: `Can't Show The Queue The Track` })
    }
  }
}