'use client'

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';

const VendorListView = () => {
  const { isDarkTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [vendorsData, setVendorsData] = useState([]);
  const [newVendor, setNewVendor] = useState({ id: 0, name: "", type: "", criticality: "", status: "", contact: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/api/vendors'); // Update with your API endpoint
        setVendorsData(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const validateInputs = () => {
    const { name, type, criticality, status, contact } = newVendor;
    if (!name || !type || !criticality || !status || !contact) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact)) {
      return "Contact must be a valid email.";
    }
    return "";
  };

  const addVendor = async (e) => {
    e.preventDefault(); // Prevent form submission

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('/api/vendors', newVendor);
      setVendorsData([...vendorsData, response.data]);
      setNewVendor({ id: 0, name: "", type: "", criticality: "", status: "", contact: "" });
      setDialogOpen(false);
      setError("");
    } catch (error) {
      console.error("Error adding vendor:", error);
      setError("Failed to add vendor. Please try again.");
    }
  };

  const filteredVendors = vendorsData.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 p-8">
        <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md w-full dark:bg-gray-700 dark:text-gray-100"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">Add New Vendor</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Vendor</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new vendor.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={addVendor}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          value={newVendor.name}
                          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Type <span className="text-red-500">*</span></Label>
                        <select
                          id="type"
                          value={newVendor.type}
                          onChange={(e) => setNewVendor({ ...newVendor, type: e.target.value })}
                          className="col-span-3 border rounded p-2"
                          required
                        >
                          <option value="" disabled>Select Vendor Type</option>
                          <option value="Supplier">Supplier</option>
                          <option value="ServiceProvider">ServiceProvider</option>
                          <option value="Logistics">Logistics</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="criticality" className="text-right">Criticality <span className="text-red-500">*</span></Label>
                        <select
                          id="criticality"
                          value={newVendor.criticality}
                          onChange={(e) => setNewVendor({ ...newVendor, criticality: e.target.value })}
                          className="col-span-3 border rounded p-2"
                          required
                        >
                          <option value="">Select Criticality</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Critical">Critical</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status <span className="text-red-500">*</span></Label>
                        <select
                          id="status"
                          value={newVendor.status}
                          onChange={(e) => setNewVendor({ ...newVendor, status: e.target.value })}
                          className="col-span-3 border rounded p-2"
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="UnderReview">Under Review</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contact" className="text-right">Contact <span className="text-red-500">*</span></Label>
                        <Input
                          id="contact"
                          type="email"
                          value={newVendor.contact}
                          onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                          className="col-span-3"
                          required
                        />
                      </div>
                      {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Add Vendor</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Criticality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.length > 0 ? filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.type}</TableCell>
                    <TableCell>
                      <Badge className={getCriticalityColor(vendor.criticality)}>
                        {vendor.criticality}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vendor.status)}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.contact}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No vendors found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorListView;
