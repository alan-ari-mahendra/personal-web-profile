import { PrismaClient } from "@prisma/client"
import { projects } from "../lib/projects"
import { blogs } from "../lib/blogs"
import { experiences } from "../lib/experiences"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding projects...")
  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: (await prisma.project.findFirst({ where: { title: project.title } }))?.id ?? "" },
      update: {
        description: project.description,
        tags: project.tags,
        status: project.status,
        links: project.links,
        gradient: project.gradient,
      },
      create: {
        title: project.title,
        description: project.description,
        tags: project.tags,
        status: project.status,
        links: project.links,
        gradient: project.gradient,
      },
    })
  }

  console.log("Seeding blogs...")
  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        description: blog.description,
        tags: blog.tags,
        date: new Date(blog.date),
        readingTime: blog.readingTime,
        gradient: blog.gradient,
        published: blog.published,
        content: blog.content,
      },
      create: {
        title: blog.title,
        description: blog.description,
        tags: blog.tags,
        date: new Date(blog.date),
        readingTime: blog.readingTime,
        slug: blog.slug,
        gradient: blog.gradient,
        published: blog.published,
        content: blog.content,
      },
    })
  }

  console.log("Seeding experiences...")
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i]
    await prisma.experience.upsert({
      where: { id: (await prisma.experience.findFirst({ where: { role: exp.role, company: exp.company } }))?.id ?? "" },
      update: {
        period: exp.period,
        bullets: exp.bullets,
        tags: exp.tags,
        order: i,
      },
      create: {
        period: exp.period,
        role: exp.role,
        company: exp.company,
        bullets: exp.bullets,
        tags: exp.tags,
        order: i,
      },
    })
  }

  console.log("Seed complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
