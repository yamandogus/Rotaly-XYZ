"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { Customer as ImportedCustomer } from "@/types/customer";
import { adminService } from "@/services/admin.service";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks/use-page-title";
import { 
  CustomerStatsCards,
  CustomerListSection,
  CustomersLoading
} from "@/components/dashboard/admin/customers";

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
  };

  const handleDelete = (customer: Customer) => {
    console.log("Delete customer:", customer);
    const response = adminService.deleteUser(customer.id);
    console.log("Delete customer response:", response);
  };

  // Loading durumunda skeleton göster
  if (loading) {
    return <CustomersLoading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <CustomerStatsCards allUsers={allUsers} />

        {/* Customer List Section */}
        <CustomerListSection
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activeFilter={activeFilter}
          shortBy={shortBy}
          handleViewDetails={handleViewDetails}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          paginatedCustomers={paginatedCustomers}
          filteredCustomers={filteredCustomers}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}