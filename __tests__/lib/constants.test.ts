import { describe, it, expect } from 'vitest'
import {
  personalInfo,
  experience,
  skillCategories,
  projects,
  education,
  stats,
  navLinks,
  type ExperienceItem,
  type SkillCategory,
  type ProjectItem,
  type EducationItem,
} from '@/lib/constants'

describe('personalInfo', () => {
  it('has the correct name', () => {
    expect(personalInfo.name).toBe('Himanshu Shrivastava')
  })

  it('has a valid email address', () => {
    expect(personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('has a LinkedIn URL', () => {
    expect(personalInfo.linkedin).toContain('linkedin.com')
  })

  it('has a GitHub URL', () => {
    expect(personalInfo.github).toContain('github.com')
  })

  it('has a non-empty summary', () => {
    expect(personalInfo.summary.length).toBeGreaterThan(100)
  })

  it('has a title', () => {
    expect(personalInfo.title).toBeTruthy()
  })
})

describe('experience', () => {
  it('has at least 5 experience items', () => {
    expect(experience.length).toBeGreaterThanOrEqual(5)
  })

  it('each item has required fields', () => {
    experience.forEach((item: ExperienceItem) => {
      expect(item.company).toBeTruthy()
      expect(item.role).toBeTruthy()
      expect(item.period).toBeTruthy()
      expect(item.achievements).toBeInstanceOf(Array)
      expect(item.achievements.length).toBeGreaterThan(0)
      expect(typeof item.isCurrent).toBe('boolean')
    })
  })

  it('first item is the most recent (Incubyte)', () => {
    expect(experience[0].company).toBe('Incubyte')
    expect(experience[0].isCurrent).toBe(true)
  })

  it('most recent item has no endDate of "present"', () => {
    const current = experience.find((e) => e.isCurrent)
    expect(current).toBeDefined()
    expect(current?.endDate).toBe('present')
  })

  it('non-current items have proper endDate format', () => {
    experience
      .filter((e) => !e.isCurrent)
      .forEach((item) => {
        expect(item.endDate).toMatch(/^\d{4}-\d{2}$/)
      })
  })
})

describe('skillCategories', () => {
  it('has exactly 7 skill categories', () => {
    expect(skillCategories).toHaveLength(7)
  })

  it('each category has required fields', () => {
    skillCategories.forEach((cat: SkillCategory) => {
      expect(cat.name).toBeTruthy()
      expect(cat.icon).toBeTruthy()
      expect(cat.skills).toBeInstanceOf(Array)
      expect(cat.skills.length).toBeGreaterThan(0)
    })
  })

  it('includes TypeScript in Languages category', () => {
    const languages = skillCategories.find((c) => c.name === 'Languages')
    expect(languages?.skills).toContain('TypeScript')
  })

  it('includes AWS in Cloud & DevOps category', () => {
    const cloud = skillCategories.find((c) => c.name === 'Cloud & DevOps')
    expect(cloud?.skills).toContain('AWS')
  })

  it('includes AI Engineering category', () => {
    const ai = skillCategories.find((c) => c.name === 'AI Engineering')
    expect(ai).toBeDefined()
    expect(ai?.skills).toContain('Claude Code')
  })
})

describe('projects', () => {
  it('has exactly 3 projects', () => {
    expect(projects).toHaveLength(3)
  })

  it('each project has required fields', () => {
    projects.forEach((project: ProjectItem) => {
      expect(project.name).toBeTruthy()
      expect(project.tagline).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.techStack).toBeInstanceOf(Array)
      expect(project.techStack.length).toBeGreaterThan(0)
      expect(project.highlights).toBeInstanceOf(Array)
      expect(project.highlights.length).toBeGreaterThan(0)
    })
  })

  it('contains Credit Repair CRM', () => {
    expect(projects.map((p) => p.name)).toContain('Credit Repair CRM')
  })

  it('contains MarketDojo', () => {
    expect(projects.map((p) => p.name)).toContain('MarketDojo')
  })

  it('contains TourneyBot / Manager', () => {
    expect(projects.map((p) => p.name)).toContain('TourneyBot / Manager')
  })
})

describe('education', () => {
  it('has exactly 3 education items', () => {
    expect(education).toHaveLength(3)
  })

  it('each item has a degree and institution', () => {
    education.forEach((item: EducationItem) => {
      expect(item.degree).toBeTruthy()
      expect(item.institution).toBeTruthy()
    })
  })

  it('first item is the bachelor degree from RGPV', () => {
    expect(education[0].degree).toContain('Bachelor')
    expect(education[0].institution).toContain('RGPV')
    expect(education[0].year).toBe('2014')
  })
})

describe('stats', () => {
  it('has exactly 4 stats', () => {
    expect(stats).toHaveLength(4)
  })

  it('contains years experience', () => {
    const yearsExp = stats.find((s) => s.label === 'Years Experience')
    expect(yearsExp).toBeDefined()
    expect(yearsExp?.value).toBe('9+')
  })

  it('contains users served stat', () => {
    const users = stats.find((s) => s.label === 'Users Served')
    expect(users?.value).toBe('400K+')
  })
})

describe('navLinks', () => {
  it('has nav links defined', () => {
    expect(navLinks.length).toBeGreaterThan(0)
  })

  it('each link has label and href', () => {
    navLinks.forEach((link) => {
      expect(link.label).toBeTruthy()
      expect(link.href).toBeTruthy()
    })
  })

  it('contains a Blog link', () => {
    const blogLink = navLinks.find((l) => l.label === 'Blog')
    expect(blogLink).toBeDefined()
    expect(blogLink?.href).toBe('/blog')
  })
})
