import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, AlertCircle } from "lucide-react"

interface RequestCardProps {
  id: string
  broker: string
  type: string
  status: "pending" | "assigned" | "in-review" | "escalated" | "completed"
  assignedTo?: string
  timeRemaining: string
  priority: "high" | "medium" | "low"
  receivedAt: string
}

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

export function RequestCard({
  id,
  broker,
  type,
  status,
  assignedTo,
  timeRemaining,
  priority,
  receivedAt,
}: RequestCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-mono text-muted-foreground">#{id}</p>
            <h3 className="font-semibold text-base">{broker}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={statusColors[status]} variant="outline">
              {status}
            </Badge>
            <Badge className={priorityColors[priority]} variant="outline">
              {priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {assignedTo && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Assigned to:</span>
            <span className="font-medium">{assignedTo}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Time remaining:</span>
          <span className={`font-medium ${status === "escalated" ? "text-red-600" : ""}`}>{timeRemaining}</span>
        </div>
        {status === "escalated" && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-2 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">SLA Breach - Escalated</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground pt-2">Received {receivedAt}</p>
      </CardContent>
    </Card>
  )
}
