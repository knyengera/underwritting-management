import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { StatCard } from "@/components/stat-card"
import { RequestCard } from "@/components/request-card"
import { FileText, Clock, CheckCircle2, AlertTriangle, TrendingUp, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const recentRequests = [
    {
      id: "REQ-2024-1234",
      broker: "Acme Insurance Brokers",
      type: "Commercial Property",
      status: "assigned" as const,
      assignedTo: "Sarah Johnson",
      timeRemaining: "18h 30m",
      priority: "high" as const,
      receivedAt: "2 hours ago",
    },
    {
      id: "REQ-2024-1235",
      broker: "Global Risk Partners",
      type: "Liability Coverage",
      status: "in-review" as const,
      assignedTo: "Michael Chen",
      timeRemaining: "22h 15m",
      priority: "medium" as const,
      receivedAt: "4 hours ago",
    },
    {
      id: "REQ-2024-1236",
      broker: "Premier Underwriters",
      type: "Auto Insurance",
      status: "escalated" as const,
      assignedTo: "David Martinez",
      timeRemaining: "Overdue by 6h",
      priority: "high" as const,
      receivedAt: "30 hours ago",
    },
    {
      id: "REQ-2024-1237",
      broker: "Coastal Insurance Group",
      type: "Marine Coverage",
      status: "pending" as const,
      timeRemaining: "23h 45m",
      priority: "low" as const,
      receivedAt: "15 minutes ago",
    },
  ]

  const upcomingDeadlines = [
    {
      id: "REQ-2024-1230",
      broker: "Metropolitan Insurance",
      deadline: "2 hours",
      agent: "Sarah Johnson",
    },
    {
      id: "REQ-2024-1228",
      broker: "National Coverage Inc",
      deadline: "5 hours",
      agent: "Michael Chen",
    },
    {
      id: "REQ-2024-1225",
      broker: "Regional Risk Solutions",
      deadline: "8 hours",
      agent: "Emily Davis",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Requests"
                value="247"
                description="Active underwriting requests"
                icon={FileText}
                trend={{ value: 12, isPositive: true }}
              />
              <StatCard
                title="Pending Review"
                value="42"
                description="Awaiting agent assignment"
                icon={Clock}
                trend={{ value: -5, isPositive: false }}
              />
              <StatCard
                title="Completed Today"
                value="18"
                description="Successfully processed"
                icon={CheckCircle2}
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard
                title="SLA Breaches"
                value="3"
                description="Requires immediate attention"
                icon={AlertTriangle}
                trend={{ value: -2, isPositive: true }}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Requests */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Recent Requests</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid gap-4">
                  {recentRequests.map((request) => (
                    <RequestCard key={request.id} {...request} />
                  ))}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-4">
                {/* Upcoming Deadlines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingDeadlines.map((item) => (
                      <div key={item.id} className="flex flex-col gap-2 pb-4 border-b last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.deadline}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{item.broker}</p>
                        <p className="text-xs text-muted-foreground">Assigned to {item.agent}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Performance Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Performance Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">SLA Compliance</span>
                        <span className="font-semibold text-green-600">96.8%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 w-[96.8%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg Response Time</span>
                        <span className="font-semibold">8.2 hours</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[65%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Agent Utilization</span>
                        <span className="font-semibold">82%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[82%]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
