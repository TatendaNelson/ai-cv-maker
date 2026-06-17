import type { CVData, JobRequirements, MatchScore, TailoredSuggestion, TailoredCV } from '../types';

// Comprehensive keyword databases for better extraction
const SKILL_KEYWORDS = [
  // Programming Languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'scala', 'r', 'matlab', 'perl', 'shell', 'bash', 'powershell', 'sql', 'html', 'css', 'sass', 'less',
  // Frameworks & Libraries
  'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'gatsby', 'remix', 'express', 'fastapi', 'django',
  'flask', 'spring', 'laravel', 'rails', 'asp.net', 'blazor', 'electron', 'react native', 'flutter', 'ionic',
  'tailwind', 'bootstrap', 'material ui', 'antd', 'chakra ui', 'styled components', 'emotion',
  // Databases
  'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'dynamodb', 'cassandra', 'neo4j', 'elasticsearch',
  'firebase', 'supabase', 'prisma', 'sequelize', 'typeorm', 'mongoose', 'sqlalchemy', 'hibernate',
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'github actions', 'gitlab ci',
  'circleci', 'travis ci', 'prometheus', 'grafana', 'elk stack', 'nginx', 'apache', 'linux', 'ubuntu', 'debian',
  'centos', 'windows server', 'active directory', 'cloudformation', 'serverless', 'lambda', 'ec2', 's3', 'rds',
  // AI/ML
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy',
  'matplotlib', 'seaborn', 'jupyter', 'opencv', 'nlp', 'computer vision', 'data science', 'analytics',
  'statistics', 'a/b testing', 'feature engineering', 'model training', 'hyperparameter tuning',
  // Data Engineering
  'etl', 'data pipeline', 'airflow', 'spark', 'hadoop', 'kafka', 'snowflake', 'bigquery', 'redshift',
  'data warehouse', 'data lake', 'dbt', 'fivetran', 'stream processing', 'batch processing',
  // Mobile
  'ios', 'android', 'objective-c', 'xamarin', 'cordova', 'capacitor', 'expo', 'swiftui', 'jetpack compose',
  // Security
  'cybersecurity', 'penetration testing', 'owasp', 'cryptography', 'ssl', 'oauth', 'jwt', 'sso', 'ldap',
  'firewall', 'vpn', 'siem', 'vulnerability scanning', 'compliance', 'gdpr', 'hipaa', 'soc2',
  // Project Management & Methodologies
  'agile', 'scrum', 'kanban', 'jira', 'confluence', 'trello', 'asana', 'notion', 'linear', 'lean', 'six sigma',
  'project management', 'product management', 'stakeholder management', 'risk management', 'pmp', 'prince2',
  // Design
  'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'after effects', 'premiere pro', 'invision',
  'principle', 'framer', 'prototyping', 'wireframing', 'user research', 'usability testing', 'design system',
  'ui design', 'ux design', 'interaction design', 'visual design', 'graphic design', 'motion design',
  // Marketing & Growth
  'seo', 'sem', 'google ads', 'facebook ads', 'linkedin ads', 'content marketing', 'email marketing',
  'social media marketing', 'growth hacking', 'analytics', 'google analytics', 'mixpanel', 'amplitude',
  'crm', 'salesforce', 'hubspot', 'marketo', 'mailchimp', 'copywriting', 'brand strategy',
  // Other Tools
  'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'teams', 'zoom', 'notion',
  'vscode', 'intellij', 'vim', 'postman', 'insomnia', 'swagger', 'graphql', 'rest api', 'grpc', 'soap',
  'websocket', 'microservices', 'monolith', 'serverless', 'event-driven', 'cqrs', 'event sourcing',
  'blockchain', 'smart contracts', 'solidity', 'web3', 'ethereum', 'bitcoin', 'defi', 'nft',
];

const EXPERIENCE_KEYWORDS = [
  'years of experience', 'minimum experience', 'proven experience', 'track record', 'background in',
  'experience with', 'experience in', 'worked on', 'hands-on', 'practical experience', 'industry experience',
  'professional experience', 'relevant experience', 'extensive experience', 'significant experience',
  'entry level', 'junior', 'mid-level', 'senior', 'lead', 'principal', 'staff', 'manager', 'director',
  'vp', 'head of', 'c-level', 'executive',
];

const EDUCATION_KEYWORDS = [
  'bachelor', 'master', 'phd', 'doctorate', 'mba', 'degree', 'certification', 'diploma',
  'computer science', 'software engineering', 'information technology', 'data science', 'mathematics',
  'statistics', 'physics', 'engineering', 'business', 'economics', 'finance', 'marketing',
];

const SENIORITY_PATTERNS = {
  entry: ['entry level', 'junior', 'associate', '0-1 year', '0-2 years', 'fresh graduate', 'intern', 'trainee'],
  mid: ['mid-level', 'intermediate', '2-3 years', '3-5 years', 'experienced', 'professional'],
  senior: ['senior', 'sr.', 'lead', '5+ years', '7+ years', 'staff', 'principal', 'expert'],
  executive: ['director', 'vp', 'vice president', 'head of', 'c-level', 'cto', 'ceo', 'cfo', 'cmo', 'chief'],
};

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s+#\.]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function extractNgrams(tokens: string[], n: number): string[] {
  const ngrams: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

export function extractJobRequirements(jobDescription: string): JobRequirements {
  const text = jobDescription.toLowerCase();
  const tokens = tokenize(jobDescription);
  const bigrams = extractNgrams(tokens, 2);
  const trigrams = extractNgrams(tokens, 3);
  const allPhrases = [...tokens, ...bigrams, ...trigrams];

  // Extract skills
  const skills = SKILL_KEYWORDS.filter(skill => {
    const skillTokens = skill.toLowerCase().split(' ');
    if (skillTokens.length === 1) {
      return tokens.includes(skill.toLowerCase());
    } else if (skillTokens.length === 2) {
      return bigrams.includes(skill.toLowerCase());
    } else {
      return trigrams.includes(skill.toLowerCase());
    }
  });

  // Extract keywords (broader)
  const keywords = [...new Set([
    ...skills,
    ...allPhrases.filter(p => p.length > 4 && !SKILL_KEYWORDS.includes(p))
  ])].slice(0, 50);

  // Extract experience requirements
  const experience: string[] = [];
  EXPERIENCE_KEYWORDS.forEach(kw => {
    if (text.includes(kw.toLowerCase())) {
      // Try to find the surrounding context
      const idx = text.indexOf(kw.toLowerCase());
      const start = Math.max(0, idx - 30);
      const end = Math.min(text.length, idx + kw.length + 30);
      experience.push(text.slice(start, end).trim());
    }
  });

  // Extract education requirements
  const education = EDUCATION_KEYWORDS.filter(kw => text.includes(kw.toLowerCase()));

  // Extract responsibilities
  const responsibilities: string[] = [];
  const respPatterns = ['responsible for', 'duties include', 'you will', 'your role', 'key responsibilities', 'what you\'ll do'];
  respPatterns.forEach(pattern => {
    const idx = text.indexOf(pattern);
    if (idx !== -1) {
      const end = Math.min(text.length, idx + 200);
      responsibilities.push(text.slice(idx, end).trim());
    }
  });

  // Determine seniority
  let seniority: JobRequirements['seniority'] = 'unknown';
  for (const [level, patterns] of Object.entries(SENIORITY_PATTERNS)) {
    if (patterns.some(p => text.includes(p))) {
      seniority = level as JobRequirements['seniority'];
      break;
    }
  }

  // Try to determine industry
  const industryPatterns = [
    'fintech', 'healthcare', 'e-commerce', 'saas', 'gaming', 'education', 'automotive',
    'aerospace', 'retail', 'banking', 'insurance', 'consulting', 'media', 'telecommunications',
    'logistics', 'real estate', 'travel', 'hospitality', 'food', 'energy', 'government',
  ];
  const industry = industryPatterns.find(i => text.includes(i)) || 'technology';

  return {
    keywords: [...new Set(keywords)],
    skills: [...new Set(skills)],
    experience: [...new Set(experience)],
    education: [...new Set(education)],
    responsibilities: [...new Set(responsibilities)],
    seniority,
    industry,
  };
}

export function calculateMatchScore(cv: CVData, requirements: JobRequirements): MatchScore {
  // Skills match
  const cvSkillsLower = cv.skills.map(s => s.toLowerCase());
  const reqSkillsLower = requirements.skills.map(s => s.toLowerCase());
  const matchedSkills = reqSkillsLower.filter(s => cvSkillsLower.some(cs => cs.includes(s) || s.includes(cs)));
  const skillsScore = reqSkillsLower.length > 0 ? Math.round((matchedSkills.length / reqSkillsLower.length) * 100) : 100;

  // Experience match (based on description content)
  const allExpText = cv.experience.map(e => `${e.position} ${e.description} ${e.highlights.join(' ')}`).join(' ').toLowerCase();
  const matchedKeywords = requirements.keywords.filter(k => allExpText.includes(k.toLowerCase()));
  const experienceScore = requirements.keywords.length > 0 ? Math.round((matchedKeywords.length / requirements.keywords.length) * 100) : 100;

  // Keywords match (broader)
  const allCvText = JSON.stringify(cv).toLowerCase();
  const keywordMatches = requirements.keywords.filter(k => allCvText.includes(k.toLowerCase()));
  const keywordsScore = requirements.keywords.length > 0 ? Math.round((keywordMatches.length / requirements.keywords.length) * 100) : 100;

  // Education match
  const eduText = cv.education.map(e => `${e.degree} ${e.field}`).join(' ').toLowerCase();
  const eduMatches = requirements.education.filter(e => eduText.includes(e.toLowerCase()));
  const educationScore = requirements.education.length > 0 ? Math.round((eduMatches.length / requirements.education.length) * 100) : 100;

  // Overall
  const overall = Math.round((skillsScore * 0.4 + experienceScore * 0.3 + keywordsScore * 0.2 + educationScore * 0.1));

  return {
    overall: Math.min(100, overall),
    skills: Math.min(100, skillsScore),
    experience: Math.min(100, experienceScore),
    keywords: Math.min(100, keywordsScore),
    education: Math.min(100, educationScore),
  };
}

export function generateTailoredSuggestions(cv: CVData, requirements: JobRequirements): TailoredSuggestion[] {
  const suggestions: TailoredSuggestion[] = [];

  // Missing skills suggestions
  const cvSkillsLower = cv.skills.map(s => s.toLowerCase());
  const missingSkills = requirements.skills.filter(s => 
    !cvSkillsLower.some(cs => cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
  );
  
  missingSkills.forEach(skill => {
    suggestions.push({
      type: 'add',
      section: 'skills',
      message: `Add "${skill}" to your skills - it's mentioned in the job description`,
      priority: 'high',
      applied: false,
    });
  });

  // Summary optimization
  if (cv.personalInfo.summary) {
    const summaryLower = cv.personalInfo.summary.toLowerCase();
    const missingKeywords = requirements.keywords.filter(k => 
      !summaryLower.includes(k.toLowerCase()) && k.length > 4
    ).slice(0, 5);
    
    if (missingKeywords.length > 0) {
      suggestions.push({
        type: 'modify',
        section: 'summary',
        message: `Consider adding these keywords to your summary: ${missingKeywords.join(', ')}`,
        priority: 'medium',
        applied: false,
      });
    }
  } else {
    suggestions.push({
      type: 'add',
      section: 'summary',
      message: 'Add a professional summary that highlights relevant skills and experience for this role',
      priority: 'high',
      applied: false,
    });
  }

  // Experience reordering/optimization
  cv.experience.forEach((exp, _idx) => {
    const expText = `${exp.position} ${exp.description} ${exp.highlights.join(' ')}`.toLowerCase();
    const matches = requirements.keywords.filter(k => expText.includes(k.toLowerCase()));
    
    if (matches.length === 0 && requirements.keywords.length > 0) {
      suggestions.push({
        type: 'modify',
        section: 'experience',
        itemId: exp.id,
        message: `Add relevant keywords to your "${exp.position}" role (e.g., ${requirements.skills.slice(0, 3).join(', ')})`,
        priority: 'medium',
        applied: false,
      });
    }
  });

  // Reorder if most relevant experience isn't first
  if (cv.experience.length > 1) {
    const relevanceScores = cv.experience.map(exp => {
      const expText = `${exp.position} ${exp.description}`.toLowerCase();
      return requirements.keywords.filter(k => expText.includes(k.toLowerCase())).length;
    });
    
    const maxScoreIdx = relevanceScores.indexOf(Math.max(...relevanceScores));
    if (maxScoreIdx !== 0 && relevanceScores[maxScoreIdx] > relevanceScores[0]) {
      suggestions.push({
        type: 'reorder',
        section: 'experience',
        message: `Move "${cv.experience[maxScoreIdx].position}" to the top - it's most relevant to this job`,
        priority: 'high',
        applied: false,
      });
    }
  }

  // Project suggestions
  if (cv.projects.length > 0) {
    cv.projects.forEach(proj => {
      const projText = `${proj.name} ${proj.description}`.toLowerCase();
      const matches = requirements.keywords.filter(k => projText.includes(k.toLowerCase()));
      
      if (matches.length === 0) {
        suggestions.push({
          type: 'modify',
          section: 'projects',
          itemId: proj.id,
          message: `Highlight relevant technologies in "${proj.name}" project`,
          priority: 'low',
          applied: false,
        });
      }
    });
  }

  // Education suggestions
  if (requirements.education.length > 0) {
    const eduText = cv.education.map(e => `${e.degree} ${e.field}`).join(' ').toLowerCase();
    const missingEdu = requirements.education.filter(e => !eduText.includes(e.toLowerCase()));
    
    if (missingEdu.length > 0 && cv.education.length > 0) {
      suggestions.push({
        type: 'highlight',
        section: 'education',
        message: `Emphasize coursework or projects related to: ${missingEdu.slice(0, 3).join(', ')}`,
        priority: 'low',
        applied: false,
      });
    }
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export function tailorCV(cv: CVData, jobDescription: string): TailoredCV {
  const requirements = extractJobRequirements(jobDescription);
  const matchScore = calculateMatchScore(cv, requirements);
  const suggestions = generateTailoredSuggestions(cv, requirements);

  // Create tailored version (deep copy)
  const tailored: CVData = JSON.parse(JSON.stringify(cv));

  // Auto-apply some high-priority suggestions
  // Reorder experience by relevance
  if (tailored.experience.length > 1) {
    const relevanceScores = tailored.experience.map(exp => {
      const expText = `${exp.position} ${exp.description}`.toLowerCase();
      return requirements.keywords.filter(k => expText.includes(k.toLowerCase())).length;
    });
    
    const sortedIndices = relevanceScores.map((_, i) => i)
      .sort((a, b) => relevanceScores[b] - relevanceScores[a]);
    
    tailored.experience = sortedIndices.map(i => tailored.experience[i]);
  }

  // Reorder skills by relevance
  if (tailored.skills.length > 0 && requirements.skills.length > 0) {
    const skillScores = tailored.skills.map(skill => {
      const skillLower = skill.toLowerCase();
      return requirements.skills.filter(req => 
        skillLower.includes(req.toLowerCase()) || req.toLowerCase().includes(skillLower)
      ).length;
    });
    
    const sortedIndices = skillScores.map((_, i) => i)
      .sort((a, b) => skillScores[b] - skillScores[a]);
    
    tailored.skills = sortedIndices.map(i => tailored.skills[i]);
  }

  return {
    original: cv,
    tailored,
    suggestions,
    matchScore,
    jobRequirements: requirements,
  };
}

export function generateOptimizedSummary(cv: CVData, jobDescription: string): string {
  const requirements = extractJobRequirements(jobDescription);
  const keySkills = cv.skills.filter(s => 
    requirements.skills.some(r => s.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(s.toLowerCase()))
  );
  
  const years = cv.experience.length;
  const positions = cv.experience.map(e => e.position);
  const topPosition = positions[0] || 'Professional';
  
  let summary = `Results-driven ${topPosition} with ${years > 0 ? `${years}+ years` : 'strong'} of experience`;
  
  if (keySkills.length > 0) {
    summary += ` in ${keySkills.slice(0, 3).join(', ')}`;
  }
  
  summary += `. Proven track record of delivering high-quality solutions and driving business results.`;
  
  if (requirements.skills.length > 0) {
    const uniqueSkills = requirements.skills.filter(s => 
      !keySkills.some(k => k.toLowerCase().includes(s.toLowerCase()))
    ).slice(0, 2);
    
    if (uniqueSkills.length > 0) {
      summary += ` Eager to leverage expertise in ${uniqueSkills.join(' and ')}.`;
    }
  }
  
  return summary;
}
