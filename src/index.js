import { database } from './firebase.js';
import { storage } from './firebase.js';
import { ref as refer, getDownloadURL } from 'firebase/storage';
import { ref, get, child } from 'firebase/database';
import fetch from 'node-fetch';
import greetdhruv from './commands/greetdhruv.js';
import get_plant_details from './commands/get_plant_details.js';
import randomjhoncena from './commands/randomjhoncena.js';
import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
config();

const TOKEN = process.env.HARSHBHOSADIKA_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TENOR_KEY = process.env.TENOR_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in`);
});

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'greetdhruv') {
      interaction.reply({
        content: `Dhruv ${interaction.options.getString('cuss')}`,
      });
    }
    if (interaction.commandName === 'get_plant_details') {
      const dbref = ref(database);
      get(child(dbref, '/'))
        .then(async (snapshot) => {
          const data = await snapshot.val();
          const imageUrl = await getDownloadURL(
            refer(storage, 'data/photo.jpg')
          );
          await interaction.reply({
            content: `Humidity:${data.Humidity} \nMoisture:${data.Moisture} \nPump:${data.Pump} \nTemperature:${data.Temperature} \n${imageUrl}`,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (interaction.commandName === 'randomjhoncena') {
      const getGif = async () =>{
        const number = Math.floor(Math. random()*50);
        const response = await fetch(`https://tenor.googleapis.com/v2/search?q=jhon_cena&key=${TENOR_KEY}&client_key=my_test_app&limit=50`)
        const json = await response.json()
        return json.results[number].itemurl
      }
      getGif().then((url) => {
        interaction.reply({
          content: `${url}`,
        });
      })
    }
  }
});

async function main() {
  const commands = [greetdhruv, get_plant_details, randomjhoncena];

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (error) {
    console.log(error);
  }
}

main();
