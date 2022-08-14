module.exports = {
    name: "ready",
    run: async (SynthBot) => {
        console.log(`[CLIENT] ${SynthBot.user.username} is logged in and ready to listen your commands`)
    }
};