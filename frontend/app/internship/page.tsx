import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import { Calendar, Building2, ArrowRight } from "lucide-react"

// Mock internship data
const internships = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
    deadline: "March 15, 2025",
    description: "Build modern web applications using React and TypeScript",
  },
  {
    id: 2,
    role: "Backend Engineer Intern",
    company: "DataFlow Systems",
    skills: ["Node.js", "PostgreSQL", "REST APIs", "Docker"],
    deadline: "March 20, 2025",
    description: "Design and implement scalable backend services",
  },
  {
    id: 3,
    role: "Full Stack Intern",
    company: "StartupHub",
    skills: ["Next.js", "MongoDB", "Express", "AWS"],
    deadline: "March 25, 2025",
    description: "Work on full-stack features from database to UI",
  },
  {
    id: 4,
    role: "ML Engineer Intern",
    company: "AI Innovations",
    skills: ["Python", "TensorFlow", "PyTorch", "SQL"],
    deadline: "March 30, 2025",
    description: "Build and train machine learning models",
  },
  {
    id: 5,
    role: "Mobile Developer Intern",
    company: "AppVentures",
    skills: ["React Native", "JavaScript", "Firebase", "Redux"],
    deadline: "April 5, 2025",
    description: "Create cross-platform mobile applications",
  },
  {
    id: 6,
    role: "DevOps Intern",
    company: "CloudTech Solutions",
    skills: ["Kubernetes", "CI/CD", "Linux", "Terraform"],
    deadline: "April 10, 2025",
    description: "Manage infrastructure and deployment pipelines",
  },
]

// Mock stats
const stats = [
  { label: "Applied", value: "12" },
  { label: "Saved", value: "24" },
  { label: "Roadmaps", value: "8" },
]

export default function InternshipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Internships</h1>
          <p className="text-muted-foreground">Find opportunities that match your skills and career goals</p>
        </div>

        {/* Internship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight mb-1">{internship.role}</h3>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{internship.description}</p>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {internship.deadline}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full" variant="default">
                  <Link href={`/internships/${internship.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
