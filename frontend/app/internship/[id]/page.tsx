import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import { Calendar, Building2, MapPin, DollarSign, Sparkles, MessageSquare, ArrowLeft } from "lucide-react"

// Mock data - in a real app this would be fetched based on the id
const internshipData = {
  1: {
    role: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Remote",
    stipend: "$2,500/month",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git", "REST APIs", "Responsive Design"],
    deadline: "March 15, 2025",
    description: `Join our dynamic frontend team and help build cutting-edge web applications that serve millions of users. You'll work alongside experienced developers and gain hands-on experience with modern web technologies.`,
    responsibilities: [
      "Develop responsive user interfaces using React and TypeScript",
      "Collaborate with designers to implement pixel-perfect designs",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and agile ceremonies",
      "Optimize applications for maximum speed and scalability",
    ],
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong understanding of HTML, CSS, and JavaScript",
      "Experience with React and modern frontend frameworks",
      "Familiarity with version control systems (Git)",
      "Excellent problem-solving and communication skills",
    ],
  },
}

export default function InternshipDetailPage() {
  const internship = internshipData[1] // In real app: internshipData[params.id]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/internships">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Internships
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{internship.role}</h1>
                  <p className="text-xl text-muted-foreground">{internship.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {internship.location} · {internship.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{internship.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {internship.deadline}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">About the Role</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{internship.description}</p>

                <div>
                  <h3 className="font-semibold mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {internship.responsibilities.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {internship.requirements.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Required Skills</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <h3 className="font-semibold">AI-Powered Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Prepare for this internship with personalized AI assistance
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" size="lg">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate AI Roadmap
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" size="lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  View Interview Questions
                </Button>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" variant="default">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
