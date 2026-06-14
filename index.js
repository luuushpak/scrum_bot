import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });
const CHAT_ID = process.env.CHAT_ID;

const MEET_LINK = "https://meet.google.com/umz-cmon-tse";

function formatDate() {
  return new Date().toLocaleDateString("uk-UA");
}

function isActivePeriod() {
  const now = new Date();
  const end = new Date("2026-06-24");
  return now <= end;
}

function getOptions() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Join Google Meet",
            url: MEET_LINK,
          },
        ],
      ],
    },
    disable_web_page_preview: true,
  };
}

function getMessage(isFinalReminder = false) {
  return `
🔔 Scrum Meeting Reminder ///// TEEEEEEST

👋 Привіт, командо!

📅 Дата: ${formatDate()}
⏰ Час: 20:00

${isFinalReminder ? "⚠️ Через 5 хв починаємо!" : "🔔 Нагадую про сьогоднішній мітинг"}

💬 Будь ласка, підключайтесь вчасно :)
`;
}

// 🕔 17:00 — перше нагадування
cron.schedule(
  "0 17 * * *",
  async () => {
    if (!isActivePeriod()) return;

    try {
      await bot.sendMessage(CHAT_ID, getMessage(false), getOptions());
      console.log("First reminder sent ✅");
    } catch (e) {
      console.log("Error:", e.response?.body || e.message);
    }
  },
  {
    timezone: "Europe/Kyiv",
  },
);

// 🕢 19:55 — фінальне нагадування
cron.schedule(
  "55 19 * * *",
  async () => {
    if (!isActivePeriod()) return;

    try {
      await bot.sendMessage(CHAT_ID, getMessage(true), getOptions());
      console.log("Final reminder sent 🔥");
    } catch (e) {
      console.log("Error:", e.response?.body || e.message);
    }
  },
  {
    timezone: "Europe/Kyiv",
  },
);
