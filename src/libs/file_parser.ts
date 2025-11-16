import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import geminiService from "./gemini";

class FileParser {
  async parse(fileBuffer: Buffer, mimeType: string): Promise<string[]> {
    let text = "";

    if (mimeType === "application/pdf") {
      // Convert Buffer → Uint8Array
      const uint8 = new Uint8Array(fileBuffer);

      const parser = new PDFParse(uint8);
      const data = await parser.getText();
      text = data.text;

    } else if (mimeType.includes("word")) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      text = result.value;

    } else {
      text = fileBuffer.toString("utf-8");
    }

    // Extract skills using Gemini
    const skills = await geminiService.extractSkills(text);
    return skills;
  }
}

export default new FileParser();