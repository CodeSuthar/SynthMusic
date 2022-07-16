module.exports = async (client) => {
  client.manager.on("error", async (queue, error) => {
    console.log(`[Error] - ${error}`)
  })
}