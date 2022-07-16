const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db")

module.exports = async (client) => {
  client.manager.on("trackStart", async (queue, track) => {
    const queuedata = queue.metadata;
    const Guild = client.guilds.cache.get(queuedata.guild)
    if (!Guild) return;
    const Channel = Guild.channels.cache.get(queuedata.channel)
    if (!Channel) return;

    const MusicPlaying = new MessageEmbed()
    .setAuthor({ name: "Now Playing", iconURL: "https://c.tenor.com/B-pEg3SWo7kAAAAi/disk.gif" })
    .setDescription(`**Now Playing** - *[${track.title}](${track.url})* - \`${track.duration}\``)
    .setFooter({ text: `Requested By ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
    .setColor("RANDOM")

    const But1 = new MessageButton().setCustomId("volumedown").setEmoji("🔉").setStyle("PRIMARY");

    const But2 = new MessageButton().setCustomId("stop").setEmoji("⏹️").setStyle("SECONDARY");

    const But3 = new MessageButton().setCustomId("pause").setEmoji("⏸️").setStyle("PRIMARY");

    const But4 = new MessageButton().setCustomId("skip").setEmoji("⏭️").setStyle("SECONDARY");

    const But5 = new MessageButton().setCustomId("volumeup").setEmoji("🔊").setStyle("PRIMARY");

    const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);

    Channel.send({ embeds: [MusicPlaying], components: [row] }).then((msg) => {
      db.set(`np_${Guild.id}`, msg.id)
      const collector = msg.createMessageComponentCollector({
        filter: (interaction) => {
            if (queue && queue.connection.channel.id === interaction.member.voice.channelId) {
            return true;
          } else {
            interaction.reply({ content: `You are not connected to <#${queue.connection.channel.id}> to use this buttons.`, ephemeral: true });
            return false;
          };
        },
        time: track.durationMS,
      });

      const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp();

      collector.on("collect", async (interaction) => {
        if (!interaction.replied) await interaction.deferReply({ ephemeral: true });

        if (interaction.customId === "volumedown") {
          let amount = Number(queue.volume) - 10;

          if (amount === -10 || amount < 0) {
            const embed = new MessageEmbed()
            .setDescription(`Player Volume Limit Is Between 0 And 100!`)
            .setColor("RANDOM")
            interaction.editReply({ embeds: [embed] }) 
          } else {

            let embed;
          
            if (amount === 0) {
              embed = new MessageEmbed()
              .setDescription("Player Have Been Muted Sucessfully")
            } else {
              embed = new MessageEmbed()
              .setDescription(`${client.emoji.volumedown} Player Volme Has Been Set To ${amount}`)
            }
          
            await queue.setVolume(amount);
            interaction.editReply({embeds: [embed] });
          }
        } else {
          if (interaction.customId === "volumeup") {
            let amount = Number(queue.volume) + 10;

            if (amount === 110 || amount > 100) {
              const embed = new MessageEmbed()
              .setDescription(`Player Volume Limit Is Between 0 And 100!`)
              .setColor("RANDOM")
              interaction.editReply({ embeds: [embed] }) 
            } else {
            
              await queue.setVolume(amount);
              interaction.editReply({embeds: [embed.setDescription(`${client.emoji.volumeup} Set the volume to: **${amount}**`).setColor(client.embedColor)] });
            }
          } else {
            if (interaction.customId === "stop") {
              if (!queue.nowPlaying()) {
                const embed = new MessageEmbed()
                .setDescription(`There's No Player Playing In The Guild`)
                .setColor("RANDOM")
                interaction.editReply({ embeds: [embed] })  
              } else {
                const embedend = new MessageEmbed()
                .setTitle("Seems... Like Track Has Been Ended")
                .setDescription(`*[${track.title}](${track.url})* - Track Has Been **Ended**`)
                .setFooter({ text: `Track Was Requested By ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
                .setColor("RANDOM")

                const But1 = new MessageButton()
                .setCustomId("volumedown")
                .setEmoji("🔉")
                .setStyle("PRIMARY")
                .setDisabled(true)

                const But2 = new MessageButton()
                .setCustomId("stop")
                .setEmoji("⏹️")
                .setStyle("SECONDARY")
                .setDisabled(true)

                const But3 = new MessageButton()
                .setCustomId("pause")
                .setEmoji("⏸️")
                .setStyle("PRIMARY")
                .setDisabled(true)

                const But4 = new MessageButton()
                .setCustomId("skip")
                .setEmoji("⏭️")
                .setStyle("SECONDARY")
                .setDisabled(true)

                const But5 = new MessageButton()
                .setCustomId("volumeup")
                .setEmoji("🔊")
                .setStyle("PRIMARY")
                .setDisabled(true)

                const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);
      
                await Channel.messages.edit(msg.id, {
                  embeds: [embedend],
                  components: [row]
                })
                
                queue.stop()
                interaction.editReply({ embeds: [embed.setDescription(`The Player Has Been Stopped`).setColor("RANDOM")] });
                collector.stop()
              }    
            } else {
              if (interaction.customId === "pause") {
                let Action;
                if (!queue.connection.paused) {
                  queue.setPaused(true);
                  Action = `**Paused**`
                } else {
                  queue.setPaused(false);
                  Action = `**Resumed**`
                }
        
                interaction.editReply({embeds: [embed.setDescription(`The Player Has Been ${Action}`).setColor("RANDOM")] });
              } else {
                if (interaction.customId === "skip") {
                  const embed = new MessageEmbed()
                  .setAuthor({ name: "Skipped The Track" })
                  .setDescription(`Skipped - [${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
                  .setColor("RANDOM")
                  interaction.editReply({ embeds: [embed] })
                  queue.skip();
                }
              }
            }
          }
        }
      });
    });
  });
}