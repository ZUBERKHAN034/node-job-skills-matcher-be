class SkillsMatcher {
  compareSkills(jobSkills: string[], resumeSkills: string[]) {
    const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase().trim()));

    const matched = jobSkills.filter(skill => 
      resumeSet.has(skill.toLowerCase().trim())
    );

    const missing = jobSkills.filter(skill => 
      !resumeSet.has(skill.toLowerCase().trim())
    );

    const matchPercentage = jobSkills.length > 0
      ? Math.round((matched.length / jobSkills.length) * 100)
      : 0;

    return {
      jobSkills,
      resumeSkills,  
      matchPercentage,
      matchedSkills: matched,
      missingSkills: missing,
      totalJobSkills: jobSkills.length,
      totalResumeSkills: resumeSkills.length,
    };
  }
}

export default new SkillsMatcher();