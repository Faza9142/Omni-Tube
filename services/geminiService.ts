
import { GoogleGenAI, Type } from "@google/genai";
import type { Video } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const videoSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy, realistic title for the video." },
    channel: { type: Type.STRING, description: "A plausible name for the video channel." },
    views: { type: Type.STRING, description: "A formatted view count, e.g., '1.2M views' or '23K views'." },
    uploadedAt: { type: Type.STRING, description: "How long ago the video was uploaded, e.g., '3 months ago'." },
    description: { type: Type.STRING, description: "A short, engaging description of the video content, 2-3 sentences long." },
  },
  required: ["title", "channel", "views", "uploadedAt", "description"],
};

export const generateVideoResults = async (query: string): Promise<Video[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a video metadata generator for a video platform called OmniTube.
      Based on the user's search query: "${query}", generate a list of 12 realistic-sounding video results.
      Ensure the results are diverse and relevant to the search query.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: videoSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const generatedVideos: Omit<Video, 'id' | 'thumbnailUrl' | 'videoUrl'>[] = JSON.parse(jsonText);
    
    // Add placeholder data and unique IDs
    return generatedVideos.map((video, index) => ({
      ...video,
      id: `${Date.now()}-${index}`,
      thumbnailUrl: `https://picsum.photos/seed/${query}${index}/480/270`,
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder video
    }));
  } catch (error) {
    console.error("Error generating video results:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
