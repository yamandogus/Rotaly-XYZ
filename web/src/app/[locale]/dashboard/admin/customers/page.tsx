"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { customersData } from "@/data/dumy";
import { CustomerFilters, CustomerTable, CustomerMobilCard } from "@/components/dashboard/admin/customers";

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
        customer.surname.toLowerCase().includes(value.toLowerCase()) ||
        customer.email.toLowerCase().includes(value.toLowerCase()) ||
        customer.phone.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const activeFilter = (value: string) => {
    if (value === "all") {
      setFilteredCustomers(customersData);
    } else if (value === "verified") {
      setFilteredCustomers(customersData.filter((customer) => customer.isVerified === true));
    } else if (value === "unverified") {
      setFilteredCustomers(customersData.filter((customer) => customer.isVerified === false));
    }
  };

  const shortBy = (short: string)=>{
    const sortedCustomers = [...customersData].sort((a, b)=>{
      if(short === "name"){
        return a.name.localeCompare(b.name);
      }
      if(short === "name-desc"){
        return b.name.localeCompare(a.name);
      }
      if(short === "email"){
        return a.email.localeCompare(b.email);
      }
      if(short === "email-desc"){
        return b.email.localeCompare(a.email);
      }
      if(short === "phone"){
        return a.phone.localeCompare(b.phone);
      }
      if(short === "phone-desc"){
        return b.phone.localeCompare(a.phone);
      }
      if(short === "createdAt"){
        return a.createdAt.localeCompare(b.createdAt);
      } 
      if(short === "createdAt-desc"){
        return b.createdAt.localeCompare(a.createdAt);
      }
      if(short === "lastReservation"){
        return a.lastReservation.localeCompare(b.lastReservation);
      }
      if(short === "lastReservation-desc"){
        return b.lastReservation.localeCompare(a.lastReservation);
      }
      if(short === "totalSpent"){
        return a.totalSpent - b.totalSpent;
      }
      if(short === "totalSpent-desc"){
        return b.totalSpent - a.totalSpent;
      }
      return 0;
    })
    setFilteredCustomers(sortedCustomers);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-card border border-border cursor-pointer hover:bg-accent transition-all duration-300">
              <CardContent className="p-4">
                <div className="space-y-1 ">
                  <p className="text-2xl md:text-3xl font-bold text-foreground text-center">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground text-center">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer List Section */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <CustomerFilters
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              activeFilter={activeFilter}
              shortBy={shortBy}
            />
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table */}
            <CustomerTable
              filteredCustomers={filteredCustomers}
              activeFilter={activeFilter}
              shortBy={shortBy}
              handleViewDetails={(customer) => console.log("View details:", customer.id)}
              handleEdit={(customer) => console.log("Edit:", customer.id)}
              handleDelete={(customer) => console.log("Delete:", customer.id)}
            />

            {/* Mobile Cards */}
            <CustomerMobilCard
              filteredCustomers={filteredCustomers}
              handleViewDetails={(customer) => console.log("View details:", customer.id)}
              handleEdit={(customer) => console.log("Edit:", customer.id)}
              handleDelete={(customer) => console.log("Delete:", customer.id)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
