export interface IJobSkills {
  jobTitle: string;
}

export interface IResumeUpload {
  file: Express.Multer.File;
}

export interface ICompareSkills {
  jobSkills: string[];
  resumeSkills: string[];
}
