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

const JOB_MATCHER_SCHEMA = {
  functionDeclarations: [
    {
      name: "match_job_file",
      description: "Match a job title to the most appropriate job file name from a list of available files.",
      parametersJsonSchema: {
        type: "object",
        properties: {
          matchedFile: {
            type: "string",
            description: "The best matching job file name from the provided list",
          },
          confidence: {
            type: "string",
            description: "Confidence level: high, medium, or low",
          },
        },
        required: ["matchedFile"],
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

  async matchJobFile(jobTitle: string, jobs: string[]): Promise<string> {
    const prompt = `Given the job title "${jobTitle}", find the best matching file name from this list: ${jobs.join(", ")}
    
Consider:
- Semantic similarity (e.g., "Backend Engineer" matches "backend_developer.html")
- Common job title variations (e.g., "Full Stack" matches "fullstack" or "full_stack")
- Technology-specific roles (e.g., "React Developer" matches "frontend_developer.html")
- Seniority levels are less important than role type

Return the exact file name from the list that best matches. If no good match exists, return "none".`;

    const response = await this.aiClient.models.generateContent({
      model: constants.AI.GOOGLE.MODEL_NAME,
      contents: prompt,
      config: { tools: [JOB_MATCHER_SCHEMA] },
    });

    const functionCall = response.functionCalls?.[0];
    const matchedFile = functionCall?.args?.matchedFile as string;
    
    // Verify the matched file exists in the jobs array
    if (matchedFile && jobs.includes(matchedFile)) {
      return matchedFile;
    }
    
    return "none";
  }
}

export default new GeminiService();