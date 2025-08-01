const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
       You are a creative AI for generating social media captions.
    Keep captions short and concise, context-aware, and engaging.
    Use humor, style, or emotion as needed based on image description.
    include hashtags if appropirate.`,
    },
  });
  return response.text;
}

module.exports = generateCaption;
