import { useState } from "react";
import { 
  Car, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus,
  BarChart3,
  PieChart,
  FileText
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data
  const stats = {
    totalCars: 45,
    activeBookings: 18,
    revenue: 28750,
    customers: 234
  };

  const recentBookings = [
    {
      id: "1",
      customer: "John Smith",
      car: "BMW 3 Series",
      dates: "Dec 15-18, 2024",
      amount: "$255",
      status: "confirmed"
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      car: "Tesla Model 3",
      dates: "Dec 20-25, 2024",
      amount: "$475",
      status: "pending"
    },
    {
      id: "3",
      customer: "Mike Davis",
      car: "Audi Q7",
      dates: "Dec 22-24, 2024",
      amount: "$240",
      status: "confirmed"
    }
  ];

  const topCars = [
    { name: "Tesla Model 3", bookings: 24, revenue: "$2,280" },
    { name: "BMW 3 Series", bookings: 18, revenue: "$1,530" },
    { name: "Audi Q7", bookings: 15, revenue: "$1,800" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your car rental business</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/admin/bookings">
                <Calendar className="h-4 w-4 mr-2" />
                View Bookings
              </Link>
            </Button>
            <Button className="premium-button" asChild>
              <Link to="/admin/add-car">
                <Plus className="h-4 w-4 mr-2" />
                Add Car
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
              <Car className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCars}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBookings}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.customers}</div>
              <p className="text-xs text-muted-foreground">
                +15 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>
                  Latest car rental bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{booking.customer}</p>
                        <p className="text-sm text-muted-foreground">{booking.car}</p>
                        <p className="text-xs text-muted-foreground">{booking.dates}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">{booking.amount}</p>
                        <Badge 
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin/bookings">
                      View All Bookings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Cars */}
          <div>
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top Cars
                </CardTitle>
                <CardDescription>
                  Most popular vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCars.map((car, index) => (
                    <div key={car.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{car.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {car.bookings} bookings
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{car.revenue}</p>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="luxury-card mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/revenue">
                    <PieChart className="h-4 w-4 mr-2" />
                    Revenue Report
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/export">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Data
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;