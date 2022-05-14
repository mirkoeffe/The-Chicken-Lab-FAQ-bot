# Discord FAQ Bot
My edited version of https://github.com/FernandoTBarros/discord-faq-bot

# Install
1. Create a * *.env* file copying from *env.template* and put your Bot Token and Discord ID.

```.env
# Token of Discord Bot:
BOT_TOKEN=
# Discord ID of the Admin user of the bot:
ADMIN_DISCORD_ID=
```

2. Run `yarn` or `npm install` to download and build the packages

3. Run `yarn dev` to start the bot in development mode

# Configure
On `faq-config.json` file there are all the available configuration options to the FAQ menu. 

Fell free to change anything

Put the questions inside the `questions` tag array following the example:
```JSON
{
	"question": "What is this bot?",
	"answer": "This bot will send this FAQ"
}
```

# Contribute
Fell free to contribute forking and sending your PR.
