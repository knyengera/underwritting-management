"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, Clock, User, FileText, AlertCircle, CheckCircle2, Download, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  assigned: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  "in-review": "bg-purple-500/10 text-purple-700 border-purple-500/20",
  escalated: "bg-red-500/10 text-red-700 border-red-500/20",
  completed: "bg-green-500/10 text-green-700 border-green-500/20",
}

const priorityColors = {
  high: "bg-red-500/10 text-red-700 border-red-500/20",
  medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  low: "bg-green-500/10 text-green-700 border-green-500/20",
}

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState("assigned")

  // Mock data - in real app, fetch based on params.id
  const request = {
    id: params.id,
    broker: "Acme Insurance Brokers",
    type: "Commercial Property",
    status: "assigned",
    priority: "high",
    assignedTo: "Sarah Johnson",
    receivedAt: "2024-01-15T10:30:00",
    deadline: "2024-01-16T18:00:00",
    description:
      "Request for commercial property insurance coverage for a 50,000 sq ft warehouse facility located in downtown Chicago. The property includes office space, storage areas, and loading docks. Client requires comprehensive coverage including fire, theft, and liability protection.",
    documents: [
      { name: "Property_Assessment.pdf", size: "2.4 MB", uploadedAt: "2024-01-15T10:30:00" },
      { name: "Building_Plans.pdf", size: "5.1 MB", uploadedAt: "2024-01-15T10:31:00" },
      { name: "Insurance_Application.pdf", size: "1.8 MB", uploadedAt: "2024-01-15T10:32:00" },
    ],
    timeline: [
      {
        action: "Request Received",
        user: "System",
        timestamp: "2024-01-15T10:30:00",
        description: "New underwriting request submitted by Acme Insurance Brokers",
      },
      {
        action: "Assigned to Agent",
        user: "Admin",
        timestamp: "2024-01-15T10:45:00",
        description: "Request assigned to Sarah Johnson",
      },
      {
        action: "Initial Review",
        user: "Sarah Johnson",
        timestamp: "2024-01-15T11:20:00",
        description: "Started initial document review and risk assessment",
      },
      {
        action: "Comment Added",
        user: "Sarah Johnson",
        timestamp: "2024-01-15T14:30:00",
        description: "Requested additional documentation for fire safety systems",
      },
    ],
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Link href="/requests">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Requests
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Request Details</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </header>

          <div className="p-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Request Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-mono text-muted-foreground">#{request.id}</p>
                        <CardTitle className="text-2xl">{request.broker}</CardTitle>
                        <p className="text-muted-foreground">{request.type}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className={statusColors[request.status as keyof typeof statusColors]} variant="outline">
                          {request.status}
                        </Badge>
                        <Badge
                          className={priorityColors[request.priority as keyof typeof priorityColors]}
                          variant="outline"
                        >
                          {request.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{request.description}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Received</p>
                        <p className="text-sm font-medium">{new Date(request.receivedAt).toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Deadline</p>
                        <p className="text-sm font-medium">{new Date(request.deadline).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documents ({request.documents.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {request.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.size} • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Activity Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {request.timeline.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                            {index < request.timeline.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-semibold">{event.action}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">by {event.user}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Update Status</label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="assigned">Assigned</SelectItem>
                          <SelectItem value="in-review">In Review</SelectItem>
                          <SelectItem value="escalated">Escalated</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Update Status</Button>
                    <Separator />
                    <Button variant="outline" className="w-full bg-transparent">
                      Reassign Request
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Escalate
                    </Button>
                  </CardContent>
                </Card>

                {/* Assignment Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Assignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">SJ</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{request.assignedTo}</p>
                        <p className="text-xs text-muted-foreground">Senior Underwriter</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Requests</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Response Time</span>
                        <span className="font-medium">6.5 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-medium">98.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Add Comment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Add Comment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      placeholder="Add a comment or note..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
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
