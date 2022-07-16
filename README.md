<p align="center"><img width="20%" src="https://cdn.discordapp.com/attachments/936524382501765140/997842726886314014/unknown_1-modified.png"/></p>
<h2 align="center">Our Music Bot</h2>
<h4 align="center">A Highly Powerful Music Bot Without Lavalink Which Is Gonna Have Setup, A Specific Text Channel For Bot Command Feature, And DJ System Soon</h4>
<br>
<br>
<br>

[![Version][version-shield]](version-url)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

# 🦾 Features
* No Need Of Lavalink In SynthMusic
* 🎶 Available Music Sources
```
- ✅ YouTube (Live Stram Supported)
- ✅ SoundCloud
- ✅ http (you can use radio for it)
- ✅ Spotify
```

# 🖼️ Screenshots
  <a href="https://github.com/Rtxoen/SynthMusic">
    <img src="https://cdn.discordapp.com/attachments/936524382501765140/997864273940332644/unknown.png">
    <img src="https://cdn.discordapp.com/attachments/936524382501765140/997864629122371685/unknown.png">
    <img src="https://media.discordapp.net/attachments/936524382501765140/997865171278110801/unknown.png">
    <img src="https://media.discordapp.net/attachments/936524382501765140/997865651068731512/unknown.png?width=532&height=406">
    <img src="https://media.discordapp.net/attachments/936524382501765140/997871374792130671/unknown.png">
  </a>

# Installation Guide 🔥


## 💻 Hosting Requirements

<details>
  <summary>Click To See Hosting Requirments</summary>

  * [NodeJS](https://nodejs.org) Version 16.6 Or Higher
  * [Discord.JS](https://npmjs.com/package/discord.js) I Recommend You To Use The Latest Discord.JS Version

</details>


## 🤖 Bot Requirements

<details>
  <summary>Click To See Bot Requirments</summary>

  * A Token Ofcourse You Will Have That, As You Are Here, If You Don't Get It From [Discord Developer Portal](https://discord.dev)
  * Mongo URI(Universal Resource Identifier) Get The Free Database, And Get Started

</details>


## Importing The Files

<details>
  <summary>Click To See The Step</summary>

  * Use ```git clone https://github.com/Rtxeon/SynthMusic.git``` In The Shell
  * Or Do It Manually By Downloading

</details>

## Setting The Configuration

<details>
  <summary>Click To See The Step</summary>

  * Filling The Config.js 
  ```js
    module.exports = {
      Bot: {
        Token: process.env.Token || ".",
        Prefix: process.env.Prefix || "",
      },

      OwnerId: ["", ""],
      Mongo_URL: process.env.Mongo_URL || "",
      SlashSupport: true, //If You Want Slash CMD In Your Bot Set This To True Else False
      SlashAsGlobal: true //If You Want To Deploy Slash CMD As Global Set This To True And If You Want To Deploy It On Each Server Set It False (To Make This Option Work     You Need To True Slash Support)
    }
  ``` 
</details>

## Installing The Packages

<details>
  <summary>Click To See The Step</summary>

  * Use ```npm i``` Or ```npm install``` In The Shell
</details>

## Running The Code, The Final Step

<details>
  <summary>Click To See The Step</summary>

  * Use ```node index.js``` Or ```npm start``` In The Shell
</details>

# 🔐 License

Distributed under the Apache 2.0 License. See [`LICENSE`](https://github.com/Rtxeon/SynthMusic/blob/master/LICENSE) for more information.

[version-shield]: https://img.shields.io/github/package-json/v/Rtxeon/SynthMusic?style=for-the-badge
[version-url]: https://github.com/Rtxeon/SynthMusic
[contributors-shield]: https://img.shields.io/github/contributors/Rtxeon/SynthMusic?style=for-the-badge
[contributors-url]: https://github.com/Rtxeon/SynthMusic/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Rtxeon/SynthMusic?style=for-the-badge
[forks-url]: https://github.com/Rtxeon/SynthMusic/network/members
[stars-shield]: https://img.shields.io/github/stars/Rtxeon/SynthMusic.svg?style=for-the-badge
[stars-url]: https://github.com/Rtxeon/SynthMusic/stargazers
[issues-shield]: https://img.shields.io/github/issues/Rtxeon/SynthMusic?style=for-the-badge
[issues-url]: https://github.com/Rtxeon/SynthMusic/issues
[license-shield]: https://img.shields.io/github/license/Rtxeon/SynthMusic?style=for-the-badge
[license-url]: https://github.com/Rtxeon/SynthMusic/blob/main/LICENSE
