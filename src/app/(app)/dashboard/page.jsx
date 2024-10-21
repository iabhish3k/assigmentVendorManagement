'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip as RechartsTooltip } from 'recharts'; // Ensure the import is correctly referenced
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"; // Ensure this is your Tooltip component from UI library
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Users } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EnhancedVendorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendorTypeData, setvendorTypeData] = useState([]);
  const [statusData, setstatusData] = useState([]);
  const [criticalityData, setcriticalityData] = useState([]);
  const { isDarkTheme } = useTheme();

  const [vendorsData, setVendorsData] = useState([]);
  const [vendorsDataStatic, setVendorsDataStatic] = useState([]);

  const filteredVendors = searchTerm
  ? vendorsDataStatic.filter(vendor =>
      vendor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      vendor?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      vendor?.serviceProvided?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  : vendorsData;


  const getCriticalityColor = (criticality) => {
    switch (criticality.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setVendorsData(response.data.vendorList);
        setVendorsDataStatic(response.data.vendorList);
        setvendorTypeData(response.data.vendorTypeData);
        setstatusData(response.data.statusData)
        setcriticalityData(response.data.criticalityData)
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <TooltipProvider>
      <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <div className="max-w-7xl mx-auto p-4">
            <div>
              {/* Main content */}
              <main className="flex-1 p-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-blue-50 dark:bg-blue-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-100">Total Vendors</CardTitle>
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{vendorsData.length}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-green-800 dark:text-green-100">Active Vendors</CardTitle>
                      <Users className="h-4 w-4 text-green-600 dark:text-green-300" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-900 dark:text-green-50">{vendorsData.filter(v => v.status === 'Active').length}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50 dark:bg-red-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-red-800 dark:text-red-100">Critical Vendors</CardTitle>
                      <Users className="h-4 w-4 text-red-600 dark:text-red-300" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-900 dark:text-red-50">{vendorsData.filter(v => v.criticality === 'Critical').length}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50 dark:bg-yellow-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-100">Pending Vendors</CardTitle>
                      <Users className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">{vendorsData.filter(v => v.status === 'Pending').length}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                  <Label htmlFor="search" className="sr-only">Search Vendors</Label>
                  <div className="relative">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search Vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-gray-800 dark:text-white pl-10"
                    />
                    <Search className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Vendor Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-800 dark:text-white">Name</TableHead>
                      <TableHead className="text-gray-800 dark:text-white">Type</TableHead>
                      <TableHead className="text-gray-800 dark:text-white">Criticality</TableHead>
                      <TableHead className="text-gray-800 dark:text-white">Status</TableHead>
                      <TableHead className="text-gray-800 dark:text-white">Contact</TableHead>
                      {/* <TableHead className="text-gray-800 dark:text-white">Service Provided</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendors.map(vendor => (
                      <TableRow key={vendor.name}>
                        <TableCell className="text-gray-800 dark:text-white">{vendor.name}</TableCell>
                        <TableCell className="text-gray-800 dark:text-white">{vendor.type}</TableCell>
                        <TableCell>
                          <Badge className={getCriticalityColor(vendor.criticality)}>{vendor.criticality}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-800 dark:text-white">{vendor.contact}</TableCell>
                        {/* <TableCell className="text-gray-800 dark:text-white">{vendor.serviceProvided}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>


                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                  {/* Vendor Type Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Vendor Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie data={vendorTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {vendorTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Criticality Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Vendor Criticality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={criticalityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Vendor Status Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Vendor Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

              </main>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
