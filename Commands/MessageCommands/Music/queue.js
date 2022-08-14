const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const load = require('lodash');

// Credits To BrBlacky For Queue CMD

module.exports = {
    name: "queue",
    category: "Music",
    description: "Show's The Queue",
    usage: "queue",
    aliases: ["q"],
    cooldown: 5,
    execute: async (message, args, SynthBot, prefix) => {

        let queue = SynthBot.manager.getQueue(message.guild.id);
    
        if (!queue) {
            const embed = new EmbedBuilder()
            .setDescription(`There's No Player In The Guild`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }

        if (!queue.nowPlaying()) {
            const embed = new EmbedBuilder()
            .setDescription(`There's No Player Playing In The Guild`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }
    
        try {
            if (!queue.tracks.length) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
                .addFields({ name: "Queued Tracks", value: "There Are No Queued Track To Show Here" })
                .setColor("Random")
                return message.reply({ embeds: [embed] })
            }

            const queuedTracks = queue.tracks.map((m, i) => 
                `${++i} - [${m.title}](${m.url}) - \`${m.duration}\``
            );

            const trackpoint = load.chunk(queuedTracks, 10);
            let queuedList = 0;
            const Page = trackpoint.map((s) => s.join('\n'))
      
            if (queue.tracks.length > 11) {
                const embed = new EmbedBuilder()
                .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
                .addFields({ name: "Queued Tracks", value: `${Page[queuedList]}` })
                .setColor("Random")
                .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
  
                const but1 = new ButtonBuilder()
                .setCustomId("qbut_1")
                .setEmoji("⏮️")
                .setStyle("Secondary")
        
                const but2 = new ButtonBuilder()
                .setCustomId("qbut_2")
                .setEmoji("⏭️")
                .setStyle("Secondary")
        
                const but3 = new ButtonBuilder()
                .setCustomId("qbut_3")
                .setLabel(`${queuedList + 1}/${Page.length}`)
                .setStyle("Secondary")
                .setDisabled(true)
        
                const row = new ActionRowBuilder().addComponents([but1, but3, but2]);
        
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
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                            .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
                            .addFields(
                                { name:"Queued Tracks", value: `${Page[queuedList]} ` }
                            )
                            .setColor("Random")
                            .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                            msg.edit({ 
                                embeds: [embed],
                                components: [
                                    new ActionRowBuilder().addComponents(
                                       but1,
                                       but3.setLabel(`${queuedList + 1}/${Page.length}`),
                                       but2
                                    ),
                                ], 
                            })
                        } else {
                            const embed2 = new EmbedBuilder()
                            .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                            .addFields(
                                { name: "Queued Tracks", value: `${Page[queuedList]}` }
                            )
                            .setColor("Random")
                            .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
  
                            await msg.edit({
                                embeds: [embed2],
                                components: [
                                    new ActionRowBuilder().addComponents(
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
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                            .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
                            .addFields(
                                { name: "Queued Tracks", value: `${Page[queuedList]}` }
                            )
                            .setColor("Random")
                            .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            
                            msg.edit({ 
                                embeds: [embed],
                                components: [
                                    new ActionRowBuilder().addComponents(
                                        but1,
                                        but3.setLabel(`${queuedList + 1}/${Page.length}`),
                                        but2
                                    ),
                                ],  
                            })
                        } else {
                            const embed1 = new EmbedBuilder()
                            .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                            .addFields(
                                { name: "Queued Tracks", value: `${Page[queuedList]}` }
                            )
                            .setColor("Random")
                            .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                  
                            await msg.edit({
                                embeds: [embed1],
                                components: [
                                    new ActionRowBuilder().addComponents(
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
                const embed3 = new EmbedBuilder()
                .setAuthor({ name: `${message.guild.name}'s Queue'`, iconURL: message.guild.iconURL() })
                .setDescription(`• Now Playing - [${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\``)
                .addFields(
                    { name: "Queued Tracks", value: `${Page[queuedList]}` }
                )
                .setColor("Random")
                .setFooter({ text: `Page:- ${queuedList + 1}/${Page.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        
                return message.reply({ embeds: [embed3] });
            }
        } catch (e) {
            console.log(e)
            return message.reply({ content: `Can't Show The Queue The Track` })
        }
    }
}