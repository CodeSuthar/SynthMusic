module.exports = async (SynthBot) => {
    SynthBot.manager.on("connectionError", async (queue, error) => {
        console.log(`[Error] - ${error}`)
    })
}