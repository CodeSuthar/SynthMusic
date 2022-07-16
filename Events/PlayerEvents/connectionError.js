module.exports = async (client) => {
  client.manager.on("connectionError", async (queue, error) => {
    console.log(`[Error] - ${error}`)
  })
}