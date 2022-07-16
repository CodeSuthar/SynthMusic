module.exports = async (client) => {
  client.manager.on("connectionCreate", async (queue, connection) => {
    console.log(`[Player] - Joined ${connection.channel.name}(${connection.channel.id}) In ${connection.channel.guild.name}(${connection.channel.guildId}) Guild`)
  })
}