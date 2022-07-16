module.exports = async (client) => {
  client.on("disconnect", () => console.log(`[CLIENT] 
  ${client.user.username} is disconnecting...`))
  client.on("reconnecting", () => console.log(`[CLIENT] 
  ${client.user.username} is reconnecting...`))
  client.on('warn', error => console.log(error));
  client.on('error', error => console.log(error));
  process.on('unhandledRejection', error => console.log(error));
  process.on('uncaughtException', error => console.log(error))
}