module.exports = async (SynthBot) => {
  SynthBot.on("disconnect", () => console.log(`[CLIENT] 
  ${SynthBot.user.username} is disconnecting...`))
  SynthBot.on("reconnecting", () => console.log(`[CLIENT] 
  ${SynthBot.user.username} is reconnecting...`))
  SynthBot.on('warn', error => console.log(error));
  SynthBot.on('error', error => console.log(error));
  process.on('unhandledRejection', error => console.log(error));
  process.on('uncaughtException', error => console.log(error))
}