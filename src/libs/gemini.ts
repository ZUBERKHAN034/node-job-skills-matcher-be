import { GoogleGenAI } from "@google/genai";
import constants from "@/common/constants";

const SKILL_SCHEMA = {
  functionDeclarations: [
    {
      name: "extract_skills",
      description: "Extract skills, tools, and technologies from text.",
      parametersJsonSchema: {
        type: "object",
        properties: {
          skills: {
            type: "array",
            description: "List of skills",
            items: { type: "string" },
          },
        },
        required: ["skills"],
      },
    },
  ],
};

const REPHRASING_SCHEMA = {
  functionDeclarations: [
    {
      name: "generate_rephrasing_ideas",
      description: "Generate professional rephrasing ideas for skills to make them more impactful in resume bullet points.",
      parametersJsonSchema: {
        type: "object",
        properties: {
          ideas: {
            type: "array",
            description: "List of rephrasing ideas with original and rephrased versions",
            items: {
              type: "object",
              properties: {
                original: { type: "string", description: "Original skill or phrase" },
                rephrased: { type: "string", description: "Professional rephrased version" },
              },
              required: ["original", "rephrased"],
            },
          },
        },
        required: ["ideas"],
      },
    },
  ],
};

class GeminiService {
  private aiClient: GoogleGenAI;

  constructor() {
    this.aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async extractSkills(text: string): Promise<string[]> {
    const response = await this.aiClient.models.generateContent({
      model: constants.AI.GOOGLE.MODEL_NAME,
      contents: `Extract all technical skills from: ${text}`,
      config: { tools: [SKILL_SCHEMA] },
    });

    const functionCall = response.functionCalls?.[0];
    return (functionCall?.args?.skills as string[]) || [];
  }

  async generateRephrasingIdeas(skills: string[]): Promise<Array<{ original: string; rephrased: string }>> {
    const prompt = `Generate professional resume bullet point rephrasing ideas for these skills: ${skills.join(", ")}. 
    
For each skill, create an impactful, action-oriented bullet point that:
- Starts with a strong action verb
- Shows measurable impact or business value
- Uses professional language
- Makes the skill stand out

Example format:
- Product analytics dashboards → "Built and maintained self-serve product analytics dashboards to monitor feature adoption and experiment impact."
- Monetization experimentation → "Designed and analyzed pricing and paywall experiments to improve revenue while protecting user experience."`;

    const response = await this.aiClient.models.generateContent({
      model: constants.AI.GOOGLE.MODEL_NAME,
      contents: prompt,
      config: { tools: [REPHRASING_SCHEMA] },
    });

    const functionCall = response.functionCalls?.[0];
    return (functionCall?.args?.ideas as Array<{ original: string; rephrased: string }>) || [];
  }
}

export default new GeminiService();