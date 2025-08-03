"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search, ArrowUpDown, MoreHorizontal } from "lucide-react";

// Sample customer data based on the Figma design
const customersData = [
  {
    id: "C012482-21",
    name: "Josh Brown",
    email: "joshbrown@gmail.com",
    country: "USA",
    flag: "🇺🇸",
    createdAt: "May 5, 2007",
    lastPurchase: "October 12, 2022",
    totalSpend: "$3,500",
    status: "Active",
    avatar: "/images/userprofile.png"
  },
  {
    id: "C012482-20",
    name: "Matthew Gray",
    email: "matthewgray@gmail.com",
    country: "Canada",
    flag: "🇨🇦",
    createdAt: "June 8, 2020",
    lastPurchase: "July 5, 2008",
    totalSpend: "$2,100",
    status: "Inactive",
    avatar: "/images/userprofile.png"
  },
  {
    id: "C012482-19",
    name: "Brian Taylor",
    email: "briantaylor@gmail.com",
    country: "Mexico",
    flag: "🇲🇽",
    createdAt: "July 3, 2015",
    lastPurchase: "September 5, 2021",
    totalSpend: "$960",
    status: "Active",
    avatar: "/images/userprofile.png"
  },
  {
    id: "C012482-18",
    name: "Brian Diaz",
    email: "briandiaz@gmail.com",
    country: "USA",
    flag: "🇺🇸",
    createdAt: "April 10, 2017",
    lastPurchase: "April 5, 2013",
    totalSpend: "$5,000",
    status: "Active",
    avatar: "/images/userprofile.png"
  },
  {
    id: "C012482-17",
    name: "Matthew Young",
    email: "matthewyoung@gmail.com",
    country: "Brazil",
    flag: "🇧🇷",
    createdAt: "January 17, 2006",
    lastPurchase: "May 20, 2006",
    totalSpend: "$1,200",
    status: "Active",
    avatar: "/images/userprofile.png"
  },
];

export default function CustomersPage() {
  const t = useTranslations("Customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);

  const statsData = [
    {
      title: t("allRegisteredUsers"),
      value: "8,530",
      subtitle: "",
    },
    {
      title: t("joinedThisMonth"),
      value: "320",
      subtitle: "",
    },
    {
      title: t("purchasedIn30Days"),
      value: "5,120",
      subtitle: "",
    },
    {
      title: t("inactiveFor90Days"),
      value: "4.2%",
      subtitle: "",
    },
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = customersData.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase()) ||
        customer.email.toLowerCase().includes(value.toLowerCase()) ||
        customer.id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-card border border-border">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer List Section */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">{t("customerList")}</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("search")}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                
                {/* Filter & Sort */}
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        {t("filter")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>{t("active")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("inactive")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("allStatus")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        {t("sortBy")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>{t("name")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("dateCreated")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("lastPurchase")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("totalSpend")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">{t("customerId")}</TableHead>
                    <TableHead className="text-muted-foreground">{t("customerInformation")}</TableHead>
                    <TableHead className="text-muted-foreground">{t("country")}</TableHead>
                    <TableHead className="text-muted-foreground">{t("createdAt")}</TableHead>
                    <TableHead className="text-muted-foreground">{t("lastPurchase")}</TableHead>
                    <TableHead className="text-muted-foreground">{t("totalSpend")}</TableHead>
                    <TableHead className="text-muted-foreground">{t("status")}</TableHead>
                    <TableHead className="text-muted-foreground w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium text-foreground">
                        {customer.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{customer.flag}</span>
                          <span className="text-foreground">{customer.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{customer.createdAt}</TableCell>
                      <TableCell className="text-foreground">{customer.lastPurchase}</TableCell>
                      <TableCell className="font-medium text-foreground">{customer.totalSpend}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={customer.status === 'Active' ? 'default' : 'secondary'}
                          className={customer.status === 'Active' 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {customer.status === 'Active' ? t("active") : t("inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>{t("viewDetails")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("edit")}</DropdownMenuItem>
                            <DropdownMenuItem>{t("delete")}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={customer.status === 'Active' ? 'default' : 'secondary'}
                          className={customer.status === 'Active' 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {customer.status === 'Active' ? t("active") : t("inactive")}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                          <p className="text-muted-foreground">{t("id")}</p>
                          <p className="font-medium text-foreground">{customer.id}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("country")}</p>
                          <div className="flex items-center gap-1">
                            <span>{customer.flag}</span>
                            <span className="text-foreground">{customer.country}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("created")}</p>
                          <p className="text-foreground">{customer.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("totalSpend")}</p>
                          <p className="font-medium text-foreground">{customer.totalSpend}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}