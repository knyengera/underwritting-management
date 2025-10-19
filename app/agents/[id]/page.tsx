"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Bell,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
} from "lucide-react"
import Link from "next/link"

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  assigned: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  "in-review": "bg-purple-500/10 text-purple-700 border-purple-500/20",
  escalated: "bg-red-500/10 text-red-700 border-red-500/20",
  completed: "bg-green-500/10 text-green-700 border-green-500/20",
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const agent = {
    id: params.id,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Underwriter",
    status: "active",
    joinedDate: "2020-03-15",
    activeRequests: 8,
    completedToday: 3,
    completedThisWeek: 18,
    completedThisMonth: 72,
    avgResponseTime: "6.5 hours",
    completionRate: 98.2,
    slaCompliance: 97.5,
    workloadCapacity: 80,
    specialties: ["Commercial Property", "Liability Coverage", "Professional Liability"],
    certifications: ["CPCU", "ARM", "CIC"],
  }

  const activeRequests = [
    {
      id: "REQ-2024-1234",
      broker: "Acme Insurance Brokers",
      type: "Commercial Property",
      status: "assigned",
      priority: "high",
      receivedAt: "2024-01-15T10:30:00",
      deadline: "2024-01-16T18:00:00",
    },
    {
      id: "REQ-2024-1239",
      broker: "National Coverage Inc",
      type: "Professional Liability",
      status: "in-review",
      priority: "high",
      receivedAt: "2024-01-15T13:20:00",
      deadline: "2024-01-16T15:00:00",
    },
    {
      id: "REQ-2024-1241",
      broker: "Coastal Insurance Group",
      type: "Liability Coverage",
      status: "assigned",
      priority: "medium",
      receivedAt: "2024-01-15T14:00:00",
      deadline: "2024-01-17T12:00:00",
    },
  ]

  const recentActivity = [
    {
      action: "Completed Request",
      requestId: "REQ-2024-1230",
      timestamp: "2024-01-15T16:30:00",
      description: "Successfully processed Commercial Property request",
    },
    {
      action: "Status Update",
      requestId: "REQ-2024-1239",
      timestamp: "2024-01-15T15:45:00",
      description: "Moved request to In Review status",
    },
    {
      action: "Comment Added",
      requestId: "REQ-2024-1234",
      timestamp: "2024-01-15T14:20:00",
      description: "Requested additional documentation",
    },
    {
      action: "Request Assigned",
      requestId: "REQ-2024-1241",
      timestamp: "2024-01-15T14:00:00",
      description: "New Liability Coverage request assigned",
    },
  ]

  const performanceMetrics = [
    { month: "Sep", completed: 68, sla: 96.2 },
    { month: "Oct", completed: 71, sla: 96.8 },
    { month: "Nov", completed: 69, sla: 97.1 },
    { month: "Dec", completed: 74, sla: 97.5 },
    { month: "Jan", completed: 72, sla: 97.5 },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Link href="/agents">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Agents
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Agent Profile</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Agent Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-semibold">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{agent.name}</h2>
                        <p className="text-muted-foreground">{agent.role}</p>
                      </div>
                      <Badge variant={agent.status === "active" ? "default" : "secondary"} className="text-sm">
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {new Date(agent.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agent.activeRequests}</div>
                  <p className="text-xs text-muted-foreground">Current workload</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agent.completionRate}%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Above average
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agent.slaCompliance}%</div>
                  <p className="text-xs text-muted-foreground">Excellent performance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agent.avgResponseTime}</div>
                  <p className="text-xs text-muted-foreground">Below target</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="requests" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="requests">Active Requests</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="requests" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Active Requests ({activeRequests.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Request ID</TableHead>
                              <TableHead>Broker</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Deadline</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {activeRequests.map((request) => (
                              <TableRow key={request.id}>
                                <TableCell className="font-mono text-sm">{request.id}</TableCell>
                                <TableCell>{request.broker}</TableCell>
                                <TableCell>{request.type}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={statusColors[request.status as keyof typeof statusColors]}
                                    variant="outline"
                                  >
                                    {request.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                  {new Date(request.deadline).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="activity" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                              <div className="flex flex-col items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                </div>
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold">{activity.action}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(activity.timestamp).toLocaleString()}
                                  </p>
                                </div>
                                <p className="text-xs text-muted-foreground font-mono">{activity.requestId}</p>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="performance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Monthly Performance Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {performanceMetrics.map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{metric.month} 2024</span>
                                <div className="flex gap-4">
                                  <span className="text-muted-foreground">
                                    Completed: <span className="font-medium text-foreground">{metric.completed}</span>
                                  </span>
                                  <span className="text-muted-foreground">
                                    SLA: <span className="font-medium text-foreground">{metric.sla}%</span>
                                  </span>
                                </div>
                              </div>
                              <Progress value={metric.sla} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Workload Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Workload Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium">{agent.workloadCapacity}%</span>
                      </div>
                      <Progress value={agent.workloadCapacity} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="text-2xl font-bold">{agent.completedToday}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">This Week</p>
                        <p className="text-2xl font-bold">{agent.completedThisWeek}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold">{agent.completedThisMonth}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {agent.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full bg-transparent" variant="outline">
                      Assign New Request
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Full History
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      Edit Profile
                    </Button>
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
