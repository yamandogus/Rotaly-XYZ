"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
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
import { Filter, Search, ArrowUpDown, MoreHorizontal, Star, Plus, Eye, Edit, Trash } from "lucide-react";
import { hotelsData } from "@/data/dumy";
import { DialogHeader, DialogTitle, Dialog, DialogContent } from "@/components/ui/dialog";
import { Hotel } from "@/types/hotel";


export default function HotelsPage() {
  const t = useTranslations("Hotels");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotelsData);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const statsData = [
    {
      title: t("allRegisteredHotels"),
      value: "20",
      subtitle: "",
    },
    {
      title: t("activeHotels"),
      value: "16",
      subtitle: "",
    },
    {
      title: t("totalBookings"),
      value: "3,245",
      subtitle: "",
    },
    {
      title: t("totalRevenue"),
      value: "18.2M TL",
      subtitle: "",
    },
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = hotelsData.filter(
      (hotel: Hotel) =>
        hotel.name.toLowerCase().includes(value.toLowerCase()) ||
        hotel.location.toLowerCase().includes(value.toLowerCase()) ||
        hotel.id.toLowerCase().includes(value.toLowerCase()) ||
        hotel.owner.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const handleViewDetails = (hotel: Hotel) => {
    // SEO için ayrı sayfaya yönlendirme yapıyoruz
    router.push(`/dashboard/admin/hotels/${hotel.id}`);
  };

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Silme işlemi burada yapılacak
    console.log("Deleting hotel:", selectedHotel?.id);
    setIsDeleteDialogOpen(false);
    setSelectedHotel(null);
  };

  // otel şehirini belirle
  const getCityFromLocation = (location: string) => {
    return location.split(',')[0].trim();
  };

  const getHotelStatus = (status: string) => {
    const filteredHotelsActive = hotelsData.filter((hotel: Hotel) => hotel.status === "Active");
    const filteredHotelsInactive = hotelsData.filter((hotel: Hotel) => hotel.status === "Inactive");
    const filteredHotelsAll = hotelsData;
    if (status === "Active") {
      setFilteredHotels(filteredHotelsActive);
    } else if (status === "Inactive") {
      setFilteredHotels(filteredHotelsInactive);
    } else {
      setFilteredHotels(filteredHotelsAll);
    }
  }

  const getSortBy = (sortBy: string) => {
    const sortedHotels = [...hotelsData].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "rating-desc") {
        return a.rating - b.rating;
      }
      if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      }
      if (sortBy === "type-desc") {
        return b.type.localeCompare(a.type);
      }
      if (sortBy === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "createdAt-desc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });
    setFilteredHotels(sortedHotels);
  }



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

        {/* Hotel List Section */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">{t("hotelList")}</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("searchHotels")}
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
                      <DropdownMenuItem onClick={() => getHotelStatus("Active")}>{t("active")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => getHotelStatus("Inactive")}>{t("inactive")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => getHotelStatus("All")}>{t("allStatus")}</DropdownMenuItem>
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
                      <DropdownMenuItem onClick={() => getSortBy("name")}>{t("name")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => getSortBy("rating")}>{t("rating")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => getSortBy("type")}>{t("type")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => getSortBy("createdAt")}>{t("createdAt")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addHotel")}
                  </Button>
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
                    <TableHead className="text-muted-foreground">
                      <div className="flex items-center justify-between">
                        {t("hotelName")}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => getSortBy("name")}>
                              A-Z
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getSortBy("name-desc")}>
                              Z-A
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead className="text-muted-foreground">{t("city")}</TableHead>
                    <TableHead className="text-muted-foreground">
                      <div className="flex items-center justify-between">
                        {t("type")}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => getSortBy("type")}>
                              A-Z
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getSortBy("type-desc")}>
                              Z-A
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      <div className="flex items-center justify-between">
                        {t("rating")}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => getSortBy("rating")}>
                              En Yüksek
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getSortBy("rating-desc")}>
                              En Düşük
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      <div className="flex items-center justify-between">
                        {t("status")}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Filter className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => getHotelStatus("Active")}>
                              {t("active")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getHotelStatus("Inactive")}>
                              {t("inactive")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getHotelStatus("All")}>
                              {t("allStatus")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead className="text-muted-foreground">{t("roomCount")}</TableHead>
                    <TableHead className="text-muted-foreground">
                      <div className="flex items-center justify-between">
                        {t("createdAt")}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ArrowUpDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => getSortBy("createdAt")}>
                              En Yeni
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => getSortBy("createdAt-desc")}>
                              En Eski
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableHead>
                    <TableHead className="text-muted-foreground w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHotels.map((hotel) => (
                    <TableRow key={hotel.id} className="border-border hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={hotel.image} alt={hotel.name} />
                            <AvatarFallback>
                              {hotel.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{hotel.name}</p>
                            <p className="text-sm text-muted-foreground">{hotel.owner}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{getCityFromLocation(hotel.location)}</TableCell>
                      <TableCell className="text-foreground">{hotel.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-foreground">{hotel.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={hotel.status === 'Active' ? 'default' : 'secondary'}
                          className={hotel.status === 'Active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {hotel.status === 'Active' ? t("active") : t("inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">5</TableCell>
                      <TableCell className="text-foreground">{hotel.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(hotel)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {t("viewDetails")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(hotel)}>
                              <Edit className="h-4 w-4 mr-2" />
                              {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(hotel)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              {t("delete")}
                            </DropdownMenuItem>
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
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={hotel.image} alt={hotel.name} />
                            <AvatarFallback>
                              {hotel.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{hotel.name}</p>
                            <p className="text-sm text-muted-foreground">{hotel.owner}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={hotel.status === 'Active' ? 'default' : 'secondary'}
                          className={hotel.status === 'Active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {hotel.status === 'Active' ? t("active") : t("inactive")}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">{t("city")}</p>
                          <p className="font-medium text-foreground">{getCityFromLocation(hotel.location)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("type")}</p>
                          <p className="text-foreground">{hotel.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("rating")}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-foreground">{hotel.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("roomCount")}</p>
                          <p className="font-medium text-foreground">{hotel.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("createdAt")}</p>
                          <p className="text-foreground">{hotel.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("totalBookings")}</p>
                          <p className="text-foreground">{hotel.totalBookings}</p>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(hotel)}
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {t("viewDetails")}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(hotel)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {t("edit")}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(hotel)}
                          className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          {t("delete")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Hotel Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("editHotel")}</DialogTitle>
          </DialogHeader>
          {selectedHotel && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("editingHotel")}: <strong>{selectedHotel.name}</strong>
              </p>
              {/* Edit form buraya gelecek */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={() => {
                  // Edit işlemi
                  setIsEditDialogOpen(false);
                }}>
                  {t("save")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("deleteHotel")}</DialogTitle>
          </DialogHeader>
          {selectedHotel && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("deleteHotelConfirmation")}: <strong>{selectedHotel.name}</strong>?
              </p>
              <p className="text-sm text-red-600">
                {t("deleteWarning")}
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDelete}
                >
                  {t("delete")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}