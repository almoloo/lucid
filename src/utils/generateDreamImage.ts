import { GeneratedImageResponse } from "./types";

const generateDreamImage = async (prompt: string) => {
  try {
    const data = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      }),
    });
    if (!data.ok) {
      throw new Error("Something went wrong");
    }
    const generatedData: GeneratedImageResponse = await data.json();
    return generatedData;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export default generateDreamImage;
