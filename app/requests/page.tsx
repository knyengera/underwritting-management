"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Plus, Bell, Download, Eye } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const mockRequests = [
  {
    id: "REQ-2024-1234",
    broker: "Acme Insurance Brokers",
    type: "Commercial Property",
    status: "assigned",
    assignedTo: "Sarah Johnson",
    priority: "high",
    receivedAt: "2024-01-15T10:30:00",
    deadline: "2024-01-16T18:00:00",
  },
  {
    id: "REQ-2024-1235",
    broker: "Global Risk Partners",
    type: "Liability Coverage",
    status: "in-review",
    assignedTo: "Michael Chen",
    priority: "medium",
    receivedAt: "2024-01-15T08:15:00",
    deadline: "2024-01-16T20:00:00",
  },
  {
    id: "REQ-2024-1236",
    broker: "Premier Underwriters",
    type: "Auto Insurance",
    status: "escalated",
    assignedTo: "David Martinez",
    priority: "high",
    receivedAt: "2024-01-14T14:00:00",
    deadline: "2024-01-15T12:00:00",
  },
  {
    id: "REQ-2024-1237",
    broker: "Coastal Insurance Group",
    type: "Marine Coverage",
    status: "pending",
    assignedTo: null,
    priority: "low",
    receivedAt: "2024-01-15T11:45:00",
    deadline: "2024-01-16T23:00:00",
  },
  {
    id: "REQ-2024-1238",
    broker: "Metropolitan Insurance",
    type: "Workers Compensation",
    status: "completed",
    assignedTo: "Emily Davis",
    priority: "medium",
    receivedAt: "2024-01-14T09:00:00",
    deadline: "2024-01-15T17:00:00",
  },
  {
    id: "REQ-2024-1239",
    broker: "National Coverage Inc",
    type: "Professional Liability",
    status: "assigned",
    assignedTo: "Sarah Johnson",
    priority: "high",
    receivedAt: "2024-01-15T13:20:00",
    deadline: "2024-01-16T15:00:00",
  },
  {
    id: "REQ-2024-1240",
    broker: "Regional Risk Solutions",
    type: "Cyber Insurance",
    status: "in-review",
    assignedTo: "Michael Chen",
    priority: "medium",
    receivedAt: "2024-01-15T07:30:00",
    deadline: "2024-01-16T19:00:00",
  },
]

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

export default function RequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.broker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Request Management</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Filters and Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 gap-4 flex-col md:flex-row">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, broker, or type..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredRequests.length} of {mockRequests.length} requests
            </div>

            {/* Requests Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">{request.id}</TableCell>
                      <TableCell className="font-medium">{request.broker}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[request.status as keyof typeof statusColors]} variant="outline">
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={priorityColors[request.priority as keyof typeof priorityColors]}
                          variant="outline"
                        >
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.assignedTo || "-"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(request.receivedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(request.deadline).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/requests/${request.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
