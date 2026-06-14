import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log("🤖 Bot started... напиши щось у групі");

bot.on("message", (msg) => {
  console.log("\n====================");
  console.log("📌 CHAT TITLE:", msg.chat.title);
  console.log("🆔 CHAT ID:", msg.chat.id);
  console.log("📎 CHAT TYPE:", msg.chat.type);
});
