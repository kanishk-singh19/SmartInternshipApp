import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock history data
const historyItems = [
  {
    id: 1,
    internshipId: "1",
    company: "Google",
    position: "Software Engineering Intern",
    action: "Generated Roadmap",
    date: "2024-01-15",
    time: "2:30 PM",
    roadmap: {
      duration: "12 weeks",
      topics: ["Data Structures", "System Design", "Python"],
      completed: 45,
    },
  },
  {
    id: 2,
    internshipId: "2",
    company: "Microsoft",
    position: "Cloud Engineering Intern",
    action: "Viewed Details",
    date: "2024-01-14",
    time: "4:15 PM",
  },
  {
    id: 3,
    internshipId: "3",
    company: "Meta",
    position: "Frontend Developer Intern",
    action: "Generated Roadmap",
    date: "2024-01-13",
    time: "11:00 AM",
    roadmap: {
      duration: "10 weeks",
      topics: ["React", "TypeScript", "CSS"],
      completed: 20,
    },
  },
  {
    id: 4,
    internshipId: "1",
    company: "Google",
    position: "Software Engineering Intern",
    action: "Bookmarked",
    date: "2024-01-12",
    time: "9:45 AM",
  },
  {
    id: 5,
    internshipId: "4",
    company: "Amazon",
    position: "ML Engineering Intern",
    action: "Viewed Details",
    date: "2024-01-11",
    time: "3:20 PM",
  },
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-balance">Activity History</h1>
          <p className="text-muted-foreground text-lg">Track your internship search journey and learning progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Actions</CardDescription>
              <CardTitle className="text-3xl">{historyItems.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Roadmaps Generated</CardDescription>
              <CardTitle className="text-3xl">
                {historyItems.filter((item) => item.action === "Generated Roadmap").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Companies Viewed</CardDescription>
              <CardTitle className="text-3xl">{new Set(historyItems.map((item) => item.company)).size}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">5</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* History Timeline */}
        <div className="space-y-4">
          {historyItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Side - Main Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {item.action === "Generated Roadmap" ? (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <ExternalLink className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{item.company}</h3>
                          <Badge variant="outline">{item.action}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{item.position}</p>

                        {/* Roadmap Details if available */}
                        {item.roadmap && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-2">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">Duration: {item.roadmap.duration}</span>
                              <span className="text-primary font-medium">{item.roadmap.completed}% Complete</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {item.roadmap.topics.map((topic) => (
                                <Badge key={topic} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Date & Action */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-sm text-muted-foreground text-right">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/internships/${item.internshipId}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More History
          </Button>
        </div>
      </div>
    </div>
  )
}
