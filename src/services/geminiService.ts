import { GoogleGenAI } from "@google/genai";
import { FULL_MARKETING_PLAN } from "../content/index";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const createChatSession = () => {
  const client = getClient();
  // We inject the full marketing plan into the system instruction so the AI
  // acts as an expert on this specific document.
  return client.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a AI powered strategic marketing consultant for 5K specialized in answering questions for the 31:33 Jewelry team based on the '31:33 Jewelry Marketing Action Plan'.
      
      Here is the full content of the plan you are an expert on:
      ---
      ${FULL_MARKETING_PLAN}
      ---

      Your Goal: Help the user understand, navigate, and execute this plan. 
      Rules:
      1. Answer questions strictly based on the provided plan.
      2. If a user asks something not covered in the plan, use your general marketing knowledge but explicitly state that it is outside the specific scope of the provided document.
      3. Be concise, professional, and encouraging.
      4. Use Markdown in your responses for readability (bolding key terms, using lists).
      `,
    },
  });
};

export const sendMessageToAI = async (chatSession: any, message: string): Promise<string> => {
  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};