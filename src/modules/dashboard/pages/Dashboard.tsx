import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const statsData = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
  { title: "Total Orders", value: "+12,234", change: "+180.1%", icon: ShoppingCart },
  { title: "Total Products", value: "2,345", change: "+12.5%", icon: Package },
  { title: "Total Customers", value: "12,234", change: "+25.3%", icon: Users },
];

const chartData = [
  { month: "Jan", revenue: 4500, orders: 234 },
  { month: "Feb", revenue: 3800, orders: 198 },
  { month: "Mar", revenue: 5200, orders: 287 },
  { month: "Apr", revenue: 4800, orders: 256 },
  { month: "May", revenue: 6100, orders: 312 },
  { month: "Jun", revenue: 5500, orders: 289 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Blip ERP - Overview of your business
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#ORD-001", customer: "John Doe", status: "Completed", amount: "$250.00" },
                { id: "#ORD-002", customer: "Jane Smith", status: "Pending", amount: "$150.00" },
                { id: "#ORD-003", customer: "Bob Wilson", status: "Processing", amount: "$350.00" },
                { id: "#ORD-004", customer: "Alice Brown", status: "Completed", amount: "$450.00" },
                { id: "#ORD-005", customer: "Charlie Davis", status: "Cancelled", amount: "$120.00" },
              ].map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${order.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                      ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${order.status === "Processing" ? "bg-blue-100 text-blue-800" : ""}
                      ${order.status === "Cancelled" ? "bg-red-100 text-red-800" : ""}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
