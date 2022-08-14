module.exports = {
    Bot: {
      Token: process.env.Token || "",
      Prefix: process.env.Prefix || "",
    },
  
    OwnerId: ["", ""],
    Mongo_URL: process.env.Mongo_URL || "",
    SlashSupport: true, //If You Want Slash CMD In Your Bot Set This To True Else False
    SlashAsGlobal: false //If You Want To Deploy Slash CMD As Global Set This To True And If You Want To Deploy It On Each Server Set It False (To Make This Option Work You Need To True Slash Support)
}