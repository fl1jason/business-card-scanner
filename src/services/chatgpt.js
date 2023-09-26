import options from "../config/options";

export const getChatGPTResponse = async (prompt) => {
  try {
    console.log("prompt", prompt);

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.CHATGPT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in /api/chatgpt:", error);
    return `error: ${error}`;
  }
};
