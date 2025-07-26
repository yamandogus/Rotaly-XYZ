import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchForm from "@/components/searchForm";
import HotelCard from "@/components/hotelCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const filterOrder = ["Klima", "Mutfak", "Wifi", "TV"];

// Mock data
const mockHotels = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `Otel ${i + 1}`,
}));

const ITEMS_PER_PAGE = 9;

interface CategoryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Basit pagination helper
function getPaginationData(totalItems: number, currentPage: number, itemsPerPage: number) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockHotels.slice(startIndex, startIndex + itemsPerPage);

  return { totalPages, currentItems };
}

// Basit URL helper
function createPageUrl(page: number, searchParams: { [key: string]: string | string[] | undefined }) {
  const params = new URLSearchParams();
  
  // Mevcut parametreleri koru (sadece string olanları)
  for (const [key, value] of Object.entries(searchParams || {})) {
    if (typeof value === 'string' && key !== 'page') {
      params.set(key, value);
    }
  }
  
  params.set('page', page.toString());
  return `?${params.toString()}`;
}

// Basit pagination render
function renderPaginationItems(currentPage: number, totalPages: number, searchParams: { [key: string]: string | string[] | undefined }) {
  const items = [];
  
  for (let i = 1; i <= totalPages; i++) {
    // İlk 2, son 2, ve mevcut sayfa ±1 göster
    if (i <= 2 || i >= totalPages - 1 || Math.abs(i - currentPage) <= 1) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageUrl(i, searchParams)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    // Ellipsis ekle
    else if (i === 3 && currentPage > 4 || i === totalPages - 2 && currentPage < totalPages - 3) {
      items.push(
        <PaginationItem key={`ellipsis-${i}`}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }
  
  return items;
}

export default async function CategoryPage({ searchParams }: CategoryPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages, currentItems } = getPaginationData(mockHotels.length, currentPage, ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen">
      <div className="relative mb-16">
        {/* Hero Banner */}
        <div className="relative w-full h-[55vh] overflow-hidden">
          <Image
            src="/images/MAPPA.png"
            alt="Banner"
            fill
            className="object-contain"
            priority
          />
        </div>

        <SearchForm />

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filtreler</h2>
                <Button variant="outline" size="sm" className="rounded-full">
                  Temizle
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
                {['Kategori', 'Değerlendirme', 'Fiyat'].map((title) => (
                  <Accordion key={title} type="multiple" defaultValue={['Kategori', 'Değerlendirme', 'Fiyat', 'other']} >
                    <AccordionItem value={title}>
                      <AccordionTrigger>{title}</AccordionTrigger>
                      <AccordionContent>
                        Filtre içeriği buraya gelecek
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="other">
                    <AccordionTrigger>Diğer</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-2 flex-wrap">
                        {filterOrder.map((item) => (
                          <Button key={item} variant="outline" size="sm" className="rounded-full">
                            {item}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Hotels List */}
            <div className="lg:col-span-3">
              <div className="bg-white">
                {/* Header */}
                <div className="px-6 py-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Liste</h2>
                  <div className="text-sm text-gray-500">
                    {mockHotels.length} sonuç (Sayfa {currentPage}/{totalPages})
                  </div>
                </div>

                {/* Hotels Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
                    {currentItems.map((hotel: { id: number; name: string }) => (
                      <HotelCard key={hotel.id} item={hotel.id} />
                    ))}
                  </div>

                                     {/* Pagination */}
                   {totalPages > 1 && (
                     <div className="flex justify-center items-center mt-10">
                       <Pagination className="flex justify-end items-center">
                         <PaginationContent>
                          {/* Previous */}
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious href={createPageUrl(currentPage - 1, searchParams)} />
                            </PaginationItem>
                          )}

                          {/* Page Numbers */}
                          {renderPaginationItems(currentPage, totalPages, searchParams)}

                          {/* Next */}
                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext href={createPageUrl(currentPage + 1, searchParams)} />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
