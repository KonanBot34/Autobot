const axios = require("axios");

module.exports = {
  name: "coding",
  aliases: ["aico"],
  description: "AI Coding Assistant",
  hasPrefix: true,
  author: "YASIS",

  async run({ api, event, args }) {
    const threadID = event.threadID;

    if (!args.join(" ")) {
      return api.sendMessage(
        "AI Coding\n\nUsage:\n.coding <your coding question>",
        threadID
      );
    }

    const question = args.join(" ");

    api.sendMessage("yasis is generating code...", threadID);

    try {
      const res = await axios.get(
        `https://ioark-apiv1.onrender.com/ai/ai-coding?question=${encodeURIComponent(question)}`
      );

      const answer =
        res.data.result ||
        res.data.answer ||
        res.data.response ||
        "No response from AI.";

      api.sendMessage(
        `yasis Coding Response\n\n${answer}`,
        threadID
      );

    } catch (error) {
      api.sendMessage(
        "❌ Error: Coding AI API not responding.",
        threadID
      );
    }
  }
};
