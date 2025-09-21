const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  REST, 
  Routes, 
  SlashCommandBuilder
} = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1419202933811187712"; // ⚠️ 改成应用 ID

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ========= 注册斜杠命令 =========
const commands = [
  new SlashCommandBuilder()
    .setName("99night")
    .setDescription("显示 99night 钻石价格表")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.once("ready", async () => {
  console.log(`已登录为 ${client.user.tag}`);

  try {
    console.log("开始注册全局斜杠命令...");
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log("全局斜杠命令注册完成 ✅");
    console.log("⚠️ 注意：全局命令可能需要几分钟才会在所有服务器生效。");
  } catch (error) {
    console.error("注册命令失败：", error);
  }
});

// ========= 监听斜杠命令 =========
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "99night") {
    const embed = new EmbedBuilder()
      .setTitle("💎 99night账号")
      .setColor(0x9b59b6)
      .setDescription("以下是钻石价格表 ⬇️")
      .addFields(
        { name: "400~500钻石", value: "<:emoji_15:1410589389825773688> rm6", inline: false },
        { name: "500~600钻石", value: "<:emoji_15:1410589389825773688> rm6.5", inline: false },
        { name: "700~800钻石", value: "<:emoji_15:1410589389825773688> rm8", inline: false },
        { name: "1000~1200钻石", value: "<:emoji_15:1410589389825773688> rm10", inline: false },
        { name: "1500~1800钻石", value: "<:emoji_15:1410589389825773688> rm12.90", inline: false },
      );

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(TOKEN);
