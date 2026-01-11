const axios = require("axios");

module.exports = {
  name: "gpt",
  aliases: ["chatgpt", "ai", "ask"],
  description: "GPT AI – Smart Chat Assistant",
  hasPrefix: true,
  author: "YASIS",
  version: "1.1.0",
  cooldown: 5,

  async run({ api, event, args }) {
    const { threadID, senderID } = event;

    if (!args.length) {
      return api.sendMessage(
        "🤖 GPT AI\n━━━━━━━━━━━━━━\nUsage:\n.gpt <your question>\n\nExample:\n.gpt explain JavaScript closures\n━━━━━━━━━━━━━━",
        threadID
      );
    }

    const question = args.join(" ");

    // typing indicator
    api.sendTypingIndicator(threadID, true);

    try {
      const res = await axios.get(
        "https://betadash-api-swordslush-production.up.railway.app/gpt3-turbo",
        {
          params: { question }
        }
      );

      const answer =
        res.data.result ||
        res.data.answer ||
        res.data.response ||
        "No response from GPT AI.";

      const message =
        `🤖 GPT AI\n━━━━━━━━━━━━━━\n` +
        `${answer}\n━━━━━━━━━━━━━━\n` +
        `🧑 Asked by: ${senderID}`;

      api.sendMessage(message, threadID);

    } catch (err) {
      api.sendMessage(
        "❌ GPT AI Error\n━━━━━━━━━━━━━━\nSomething went wrong. Please try again later.\n━━━━━━━━━━━━━━",
        threadID
      );
    } finally {
      api.sendTypingIndicator(threadID, false);
    }
  }
};
