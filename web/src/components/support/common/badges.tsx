"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { SupportCategory } from "@/types/support";

interface StatusBadgeProps {
  isOpen: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isOpen }) => {
  return (
    <Badge
      variant={isOpen ? "default" : "secondary"}
      className={
        isOpen
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      }
    >
      {isOpen ? "Açık" : "Kapalı"}
    </Badge>
  );
};

interface CategoryBadgeProps {
  category: SupportCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getCategoryColor = (category: SupportCategory) => {
    switch (category) {
      case SupportCategory.TECHNICAL:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case SupportCategory.BILLING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case SupportCategory.RESERVATION:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case SupportCategory.COMPLAINT:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case SupportCategory.FEATURE_REQUEST:
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case SupportCategory.SECURITY:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryLabel = (category: SupportCategory) => {
    switch (category) {
      case SupportCategory.TECHNICAL:
        return "Teknik";
      case SupportCategory.BILLING:
        return "Faturalama";
      case SupportCategory.RESERVATION:
        return "Rezervasyon";
      case SupportCategory.COMPLAINT:
        return "Şikayet";
      case SupportCategory.FEATURE_REQUEST:
        return "Özellik Talebi";
      case SupportCategory.SECURITY:
        return "Güvenlik";
      case SupportCategory.GENERAL:
        return "Genel";
      default:
        return "Diğer";
    }
  };

  return (
    <Badge variant="secondary" className={getCategoryColor(category)}>
      {getCategoryLabel(category)}
    </Badge>
  );
};
