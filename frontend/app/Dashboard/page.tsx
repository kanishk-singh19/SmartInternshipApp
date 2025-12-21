import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { Briefcase, Map, MessageSquare, TrendingUp, Calendar, Building2 } from "lucide-react"

// Mock recent activity data
const recentActivity = [
  {
    id: 1,
    type: "applied",
    title: "Applied to Frontend Developer Intern",
    company: "TechCorp Inc.",
    date: "2 days ago",
    icon: Briefcase,
  },
  {
    id: 2,
    type: "roadmap",
    title: "Generated roadmap for React Skills",
    company: "Self Study",
    date: "3 days ago",
    icon: Map,
  },
  {
    id: 3,
    type: "interview",
    title: "Completed interview prep for Backend Engineer",
    company: "DataFlow Systems",
    date: "5 days ago",
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "saved",
    title: "Saved ML Engineer Intern position",
    company: "AI Innovations",
    date: "1 week ago",
    icon: Building2,
  },
  {
    id: 5,
    type: "applied",
    title: "Applied to Full Stack Intern",
    company: "StartupHub",
    date: "1 week ago",
    icon: Briefcase,
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your internship journey and progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applied</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+3</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Roadmaps Generated</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+2</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Interviews Prepared</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+5</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Skills Tracked</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">+6</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground">Your latest interactions and progress</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium leading-tight mb-1">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                        <Calendar className="h-3 w-3" />
                        {activity.date}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
