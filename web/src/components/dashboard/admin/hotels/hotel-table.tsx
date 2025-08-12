import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Filter, MoreHorizontal, Star, Eye, Edit, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/types/hotel';

interface HotelTableProps {
  filteredHotels: Hotel[];
  getCityFromLocation: (location: string) => string;
  getHotelStatus: (status: string) => void;
  getSortBy: (sortBy: string) => void;
  handleViewDetails: (hotel: Hotel) => void;
  handleEdit: (hotel: Hotel) => void;
  handleDelete: (hotel: Hotel) => void;
}

const HotelTable = ({ filteredHotels, getCityFromLocation, getHotelStatus, getSortBy, handleViewDetails, handleEdit, handleDelete }: HotelTableProps) => {
  const t = useTranslations("AdminHotels");

  return (
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
          <TableHead className="text-muted-foreground">{t("location")}</TableHead>
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
  )
}

export default HotelTable;