import { GeneratedTextResponse } from "./types";

const interpretDream = async (dreamText: string) => {
  try {
    const data = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `interpret this dream: ${dreamText}`,
          },
        ],
      }),
    });
    if (!data.ok) {
      throw new Error("Something went wrong");
    }
    const interpretData: GeneratedTextResponse = await data.json();
    return interpretData;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export default interpretDream;
