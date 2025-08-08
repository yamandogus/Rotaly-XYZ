"use client";

import React, { useEffect, useState } from "react";
import HotelCard from "@/components/hotelCard";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function FavoritesPage() {
  const t = useTranslations("Favorites");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleToggleFavorite = (id: number | string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredFavorites = favorites.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6  min-h-screen">
      {/* Başlık, Alt Başlık ve Arama */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">{t("title")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t("description")}</p>
        </div>
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Favori kartlar */}
      {filteredFavorites.length === 0 ? (
        <p className="text-center text-muted-foreground dark:text-gray-400">
          {searchTerm ? t("noResults") : t("noFavorites")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {filteredFavorites.map((item) => (
            <HotelCard
              key={item.id}
              item={item}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
