"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Bell, Plus, TrendingUp, TrendingDown, User, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const mockAgents = [
  {
    id: "AGT-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Underwriter",
    status: "active",
    activeRequests: 8,
    completedToday: 3,
    avgResponseTime: "6.5 hours",
    completionRate: 98.2,
    slaCompliance: 97.5,
    workloadCapacity: 80,
    specialties: ["Commercial Property", "Liability Coverage"],
  },
  {
    id: "AGT-002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Senior Underwriter",
    status: "active",
    activeRequests: 6,
    completedToday: 4,
    avgResponseTime: "7.2 hours",
    completionRate: 96.8,
    slaCompliance: 95.2,
    workloadCapacity: 60,
    specialties: ["Cyber Insurance", "Professional Liability"],
  },
  {
    id: "AGT-003",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Underwriter",
    status: "active",
    activeRequests: 5,
    completedToday: 2,
    avgResponseTime: "8.1 hours",
    completionRate: 94.5,
    slaCompliance: 93.8,
    workloadCapacity: 50,
    specialties: ["Workers Compensation", "Auto Insurance"],
  },
  {
    id: "AGT-004",
    name: "David Martinez",
    email: "david.martinez@company.com",
    role: "Senior Underwriter",
    status: "active",
    activeRequests: 9,
    completedToday: 1,
    avgResponseTime: "9.3 hours",
    completionRate: 91.2,
    slaCompliance: 89.5,
    workloadCapacity: 90,
    specialties: ["Marine Coverage", "Commercial Property"],
  },
  {
    id: "AGT-005",
    name: "Jennifer Lee",
    email: "jennifer.lee@company.com",
    role: "Underwriter",
    status: "away",
    activeRequests: 3,
    completedToday: 0,
    avgResponseTime: "7.8 hours",
    completionRate: 95.1,
    slaCompliance: 94.3,
    workloadCapacity: 30,
    specialties: ["Liability Coverage", "Professional Liability"],
  },
  {
    id: "AGT-006",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    role: "Junior Underwriter",
    status: "active",
    activeRequests: 4,
    completedToday: 2,
    avgResponseTime: "10.5 hours",
    completionRate: 88.7,
    slaCompliance: 87.2,
    workloadCapacity: 40,
    specialties: ["Auto Insurance", "Workers Compensation"],
  },
]

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAgents = mockAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const totalActiveRequests = mockAgents.reduce((sum, agent) => sum + agent.activeRequests, 0)
  const avgCompletionRate = mockAgents.reduce((sum, agent) => sum + agent.completionRate, 0) / mockAgents.length
  const avgSlaCompliance = mockAgents.reduce((sum, agent) => sum + agent.slaCompliance, 0) / mockAgents.length
  const activeAgents = mockAgents.filter((agent) => agent.status === "active").length

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Agent Management</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAgents.length}</div>
                  <p className="text-xs text-muted-foreground">{activeAgents} currently active</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalActiveRequests}</div>
                  <p className="text-xs text-muted-foreground">Across all agents</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgCompletionRate.toFixed(1)}%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg SLA Compliance</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgSlaCompliance.toFixed(1)}%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +1.5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or specialty..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Agent
              </Button>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredAgents.length} of {mockAgents.length} agents
            </div>

            {/* Agents Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map((agent) => (
                <Link key={agent.id} href={`/agents/${agent.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-semibold">
                              {agent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-base">{agent.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{agent.role}</p>
                          </div>
                        </div>
                        <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Workload Capacity</span>
                          <span className="font-medium">{agent.workloadCapacity}%</span>
                        </div>
                        <Progress value={agent.workloadCapacity} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Active Requests</p>
                          <p className="text-lg font-bold">{agent.activeRequests}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Completed Today</p>
                          <p className="text-lg font-bold">{agent.completedToday}</p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Completion Rate</span>
                          <span className="font-medium flex items-center gap-1">
                            {agent.completionRate}%
                            {agent.completionRate >= 95 ? (
                              <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">SLA Compliance</span>
                          <span className="font-medium">{agent.slaCompliance}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Avg Response</span>
                          <span className="font-medium">{agent.avgResponseTime}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
