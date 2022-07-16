module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`[CLIENT] ${client.user.username} is logged in and ready to listen your commands`)
  }
}