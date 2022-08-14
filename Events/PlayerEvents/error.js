module.exports = async (SynthBot) => {
    SynthBot.manager.on("error", async (queue, error) => {
        console.log(`[Error] - ${error}`)
    })
}