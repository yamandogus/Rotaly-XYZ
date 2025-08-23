"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomerFilters, CustomerTable, CustomerMobilCard } from "@/components/dashboard/admin/customers";
import type { Customer as ImportedCustomer } from "@/types/customer";
import { adminService } from "@/services/admin.service";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks/use-page-title";

// User interface based on API response
interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

type Customer = ImportedCustomer;

function CustomersLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-card border border-border">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Skeleton */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 w-full sm:w-64" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function transformUserToCustomer(user: User): Customer {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt ?? null,
    totalReservations: 0,
    totalSpent: 0,
    lastReservation: null,
    favoriteHotels: 0,
    totalComments: 0,
    averageRating: 0,
    paymentCards: [],
    supportRequests: 0,
    lastSupportRequest: null,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name + ' ' + user.surname)}&background=3b82f6&color=ffffff`,
  };
}

export default function CustomersPage() {
  const t = useTranslations("Customers");
  
  // Hook'ları en başta çağır
  usePageTitle(t("customerManagement"));
  
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 8; // Max 8 kullanıcı göster

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pageSize);

  // API'den kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAllUsers();
        
        if (response.success && response.data) {
          // Sadece CUSTOMER rolündeki kullanıcıları filtrele
          const users = response.data.filter((user: User) => user.role === 'CUSTOMER');
          const customers = users.map(transformUserToCustomer);
          setAllUsers(users);
          setFilteredCustomers(customers);
        }
      } catch (error) {
        console.error("Kullanıcılar yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Stats verilerini gerçek verilerden hesapla
  const statsData = [
    {
      title: t("allRegisteredUsers"),
      value: allUsers.length.toString(),
      subtitle: "",
    },
    {
      title: t("joinedThisMonth"),
      value: allUsers.filter(user => {
        const userDate = new Date(user.createdAt);
        const now = new Date();
        return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
      }).length.toString(),
      subtitle: "",
    },
    {
      title: t("purchasedIn30Days"),
      value: "0", // Bu veri rezervasyon API'sinden gelebilir
      subtitle: "",
    },
    {
      title: t("inactiveFor90Days"),
      value: allUsers.filter(user => !user.isVerified).length.toString(), // Verified olmayan kullanıcılar
      subtitle: "",
    },
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Sayfa numarasını resetle
    const filtered = allUsers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase()) ||
        customer.surname.toLowerCase().includes(value.toLowerCase()) ||
        customer.email.toLowerCase().includes(value.toLowerCase()) ||
        customer.phone.toLowerCase().includes(value.toLowerCase())
    ).map(transformUserToCustomer);
    setFilteredCustomers(filtered);
  };

  const activeFilter = (value: string) => {
    setPage(1); // Sayfa numarasını resetle
    let filteredUsers: User[];
    if (value === "all") {
      filteredUsers = allUsers;
    } else if (value === "verified") {
      filteredUsers = allUsers.filter((customer) => customer.isVerified === true);
    } else if (value === "unverified") {
      filteredUsers = allUsers.filter((customer) => customer.isVerified === false);
    } else {
      filteredUsers = allUsers;
    }
    setFilteredCustomers(filteredUsers.map(transformUserToCustomer));
  };

  const shortBy = (short: string) => {
    const sortedUsers = [...allUsers].sort((a, b) => {
      if (short === "name") {
        return a.name.localeCompare(b.name);
      }
      if (short === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (short === "email") {
        return a.email.localeCompare(b.email);
      }
      if (short === "email-desc") {
        return b.email.localeCompare(a.email);
      }
      if (short === "phone") {
        return a.phone.localeCompare(b.phone);
      }
      if (short === "phone-desc") {
        return b.phone.localeCompare(a.phone);
      }
      if (short === "createdAt") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (short === "createdAt-desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
    setFilteredCustomers(sortedUsers.map(transformUserToCustomer));
  };

  // Customer action handlers
  const handleViewDetails = (customer: Customer) => {
    console.log("View details:", customer);

    router.push(`/dashboard/admin/customers/${customer.id}`);
  };

  const handleEdit = (customer: Customer) => {
    console.log("Edit customer:", customer);
    // TODO: Open edit modal or navigate to edit page
    // router.push(`/dashboard/admin/customers/${customer.id}/edit`);
  };

  const handleDelete = (customer: Customer) => {
    console.log("Delete customer:", customer);
    // TODO: Show confirmation dialog and delete customer
    // const confirmed = confirm(`${customer.name} ${customer.surname} kullanıcısını silmek istediğinizden emin misiniz?`);
    // if (confirmed) {
    //   // API call to delete customer
    // }
  };

  // Loading durumunda skeleton göster
  if (loading) {
    return <CustomersLoading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <Card className="bg-transparent md:bg-card border-none md:border-border">
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
              filteredCustomers={paginatedCustomers}
              activeFilter={activeFilter}
              shortBy={shortBy}
              handleViewDetails={handleViewDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />

            {/* Mobile Cards - Tüm veriler gösterilir, pagination yok */}
            <CustomerMobilCard
              filteredCustomers={filteredCustomers}
              handleViewDetails={handleViewDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}