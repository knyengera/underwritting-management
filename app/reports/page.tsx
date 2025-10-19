"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Download, TrendingUp, TrendingDown, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { useState } from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const requestVolumeData = [
  { month: "Aug", received: 245, completed: 238, pending: 7 },
  { month: "Sep", received: 268, completed: 261, pending: 14 },
  { month: "Oct", received: 271, completed: 265, pending: 20 },
  { month: "Nov", received: 289, completed: 278, pending: 31 },
  { month: "Dec", received: 294, completed: 285, pending: 40 },
  { month: "Jan", received: 247, completed: 205, pending: 42 },
]

const requestTypeData = [
  { name: "Commercial Property", value: 89, color: "hsl(var(--chart-1))" },
  { name: "Liability Coverage", value: 67, color: "hsl(var(--chart-2))" },
  { name: "Auto Insurance", value: 54, color: "hsl(var(--chart-3))" },
  { name: "Workers Compensation", value: 43, color: "hsl(var(--chart-4))" },
  { name: "Professional Liability", value: 38, color: "hsl(var(--chart-5))" },
  { name: "Cyber Insurance", value: 32, color: "hsl(var(--chart-1))" },
  { name: "Marine Coverage", value: 24, color: "hsl(var(--chart-2))" },
]

const agentPerformanceData = [
  { name: "Sarah Johnson", completed: 72, sla: 97.5, avgTime: 6.5 },
  { name: "Michael Chen", completed: 68, sla: 95.2, avgTime: 7.2 },
  { name: "Emily Davis", completed: 64, sla: 93.8, avgTime: 8.1 },
  { name: "David Martinez", completed: 59, sla: 89.5, avgTime: 9.3 },
  { name: "Jennifer Lee", completed: 56, sla: 94.3, avgTime: 7.8 },
  { name: "Robert Taylor", completed: 48, sla: 87.2, avgTime: 10.5 },
]

const slaComplianceData = [
  { week: "Week 1", compliance: 96.2, target: 95 },
  { week: "Week 2", compliance: 96.8, target: 95 },
  { week: "Week 3", compliance: 97.1, target: 95 },
  { week: "Week 4", compliance: 96.5, target: 95 },
]

const responseTimeData = [
  { day: "Mon", avgTime: 7.2, target: 8 },
  { day: "Tue", avgTime: 6.8, target: 8 },
  { day: "Wed", avgTime: 7.5, target: 8 },
  { day: "Thu", avgTime: 8.1, target: 8 },
  { day: "Fri", avgTime: 7.9, target: 8 },
  { day: "Sat", avgTime: 6.5, target: 8 },
  { day: "Sun", avgTime: 6.2, target: 8 },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Reports & Analytics</h1>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.3 hrs</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -8% improvement
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.3% from last period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.8%</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +1.5% from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Request Volume Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Request Volume Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          received: {
                            label: "Received",
                            color: "hsl(var(--chart-1))",
                          },
                          completed: {
                            label: "Completed",
                            color: "hsl(var(--chart-2))",
                          },
                          pending: {
                            label: "Pending",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={requestVolumeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="received" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            <Line type="monotone" dataKey="completed" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                            <Line type="monotone" dataKey="pending" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Request Type Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Request Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Requests",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={requestTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {requestTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Request Type Breakdown Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Request Type Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requestTypeData.map((type, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                            <span className="text-sm font-medium">{type.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{type.value} requests</span>
                            <span className="text-sm font-medium w-16 text-right">
                              {((type.value / requestTypeData.reduce((sum, t) => sum + t.value, 0)) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* SLA Compliance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">SLA Compliance Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          compliance: {
                            label: "Compliance",
                            color: "hsl(var(--chart-1))",
                          },
                          target: {
                            label: "Target",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={slaComplianceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis domain={[85, 100]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="compliance" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            <Line
                              type="monotone"
                              dataKey="target"
                              stroke="hsl(var(--chart-3))"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Response Time */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Average Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          avgTime: {
                            label: "Avg Time (hrs)",
                            color: "hsl(var(--chart-2))",
                          },
                          target: {
                            label: "Target",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={responseTimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="avgTime" fill="hsl(var(--chart-2))" />
                            <Bar dataKey="target" fill="hsl(var(--chart-3))" opacity={0.3} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">First Response Time</p>
                        <p className="text-2xl font-bold">4.2 hrs</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          -12% improvement
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Resolution Time</p>
                        <p className="text-2xl font-bold">18.5 hrs</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          -8% improvement
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Escalation Rate</p>
                        <p className="text-2xl font-bold">3.2%</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          -1.2% improvement
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="agents" className="space-y-6">
                {/* Agent Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Agent Performance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        completed: {
                          label: "Completed",
                          color: "hsl(var(--chart-1))",
                        },
                        sla: {
                          label: "SLA %",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={agentPerformanceData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={120} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="completed" fill="hsl(var(--chart-1))" />
                          <Bar dataKey="sla" fill="hsl(var(--chart-2))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Agent Metrics Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detailed Agent Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {agentPerformanceData.map((agent, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold">
                                {agent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{agent.name}</p>
                              <p className="text-sm text-muted-foreground">Senior Underwriter</p>
                            </div>
                          </div>
                          <div className="flex gap-8">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Completed</p>
                              <p className="text-lg font-bold">{agent.completed}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">SLA</p>
                              <p className="text-lg font-bold">{agent.sla}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Avg Time</p>
                              <p className="text-lg font-bold">{agent.avgTime}h</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <div className="grid gap-6">
                  {/* Monthly Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Monthly Request Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          received: {
                            label: "Received",
                            color: "hsl(var(--chart-1))",
                          },
                          completed: {
                            label: "Completed",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[400px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={requestVolumeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="received" fill="hsl(var(--chart-1))" />
                            <Bar dataKey="completed" fill="hsl(var(--chart-2))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Trend Insights */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Positive Trends</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Response Time Improving</p>
                            <p className="text-xs text-muted-foreground">
                              Average response time decreased by 8% over the last 30 days
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">SLA Compliance Up</p>
                            <p className="text-xs text-muted-foreground">
                              SLA compliance improved by 1.5% compared to last period
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Agent Productivity</p>
                            <p className="text-xs text-muted-foreground">
                              Average completion rate increased by 2.3% this month
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Areas for Improvement</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Pending Requests Growing</p>
                            <p className="text-xs text-muted-foreground">
                              Backlog of pending requests increased by 20% over last month
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Workload Distribution</p>
                            <p className="text-xs text-muted-foreground">
                              Some agents are at 90% capacity while others are below 50%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Escalation Rate</p>
                            <p className="text-xs text-muted-foreground">
                              3.2% of requests require escalation, slightly above target of 2.5%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
