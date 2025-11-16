import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";
import geminiService from "./gemini";
import constants from "@/common/constants";

class JobScraper {
  async scrapeJobsByTitle(jobTitle: string): Promise<string[] | null> {
    const filesPath = path.join(__dirname, constants.PATHS.JOB_LISTINGS);
    const jobs = await fs.readdir(filesPath);

    const matchingFile = await geminiService.matchJobFile(jobTitle, jobs);
    if(matchingFile == 'none') return null;
    

    const html = await fs.readFile(path.join(filesPath, matchingFile), "utf-8");

    const jobText = this.extractJobDescription(html);

    return await geminiService.extractSkills(jobText);
  }


  // High-accuracy job description extraction using 3-layer logic
  private extractJobDescription(html: string): string {
    const $ = cheerio.load(html);

    this.removeNoise($);

    // Layer 1: Selectors
    let text = this.extractBySelectors($);

    // Layer 2: Heading-based semantic extraction
    if (!text || text.length < 120) {
      const semantic = this.extractByHeadings($);
      if (semantic.length > text.length) text = semantic;
    }

    // Layer 3: Largest meaningful text block fallback
    if (!text || text.length < 120) {
      text = this.extractLargestContentBlock($);
    }

    return this.clean(text);
  }


// Remove irrelevant/noisy elements
  private removeNoise($: cheerio.Root) {
    const noise = [
      "script",
      "style",
      "nav",
      "header",
      "footer",
      "aside",
      "noscript",
      ".ads",
      ".ad",
      ".advertisement",
      ".related-jobs",
      ".suggested-jobs",
      ".share-buttons",
      ".apply-buttons",
      ".breadcrumbs",
      ".pagination",
      ".sidebar",
      ".newsletter",
    ];

    noise.forEach((sel) => $(sel).remove());
  }

  /**
   * Layer 1: Selector-based job description extraction
   */
  private extractBySelectors($: cheerio.Root): string {
    const selectors = [
      ".job-description",
      "#job-description",
      ".jd",
      ".jobDesc",
      ".job-desc",
      ".description",
      ".desc",
      ".job_details",
      ".job-details",
      ".job-content",
      ".posting",
      ".postings",
      ".specification",
      ".content",
      ".role-description",
      "[class*='description']",
      "[id*='description']",
      "[class*='job']",
    ];

    for (const sel of selectors) {
      const block = $(sel).first();
      if (block.length) {
        const text = this.collectText($, block);
        if (text.length > 120) return text;
      }
    }

    return "";
  }


// Layer 2: Heading-based extraction (semantic)
  private extractByHeadings($: cheerio.Root): string {
    const headingKeywords = [
      "job description",
      "about the job",
      "role description",
      "responsibilities",
      "what you'll do",
      "what you will do",
      "requirements",
      "skills required",
      "what we expect",
    ];

    let result = "";

    $("h1, h2, h3, h4").each((_, el) => {
      const heading = $(el).text().toLowerCase();

      if (headingKeywords.some((k) => heading.includes(k))) {
        const next = $(el).next();
        if (next.length) {
          const extracted = this.collectText($, next);
          if (extracted.length > result.length) result = extracted;
        }
      }
    });

    return result;
  }


 // Layer 3: Extract largest meaningful content block
  private extractLargestContentBlock($: cheerio.Root): string {
    let largest = "";

    $("div, section").each((_, el) => {
      const block = $(el);
      const text = this.collectText($, block);

      if (text.length > largest.length && text.length > 80) {
        largest = text;
      }
    });

    return largest;
  }


// Collect text from p, li, span, strong, b, em elements
  private collectText($: cheerio.Root, block: cheerio.Cheerio): string {
    const parts: string[] = [];

    block.find("p, li, span, strong, b, em").each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 3) {
        parts.push(text);
      }
    });

    // also include block's direct text
    const direct = block.contents().not("p, li, span, strong, b, em").text().trim();
    if (direct && direct.length > 20) {
      parts.unshift(direct);
    }

    return parts.join("\n");
  }


  // Clean final output for AI processing
  private clean(text: string): string {
    return text
      .replace(/\s+/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim();
  }
}

export default new JobScraper();