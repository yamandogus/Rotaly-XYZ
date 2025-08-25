import React from "react";
import { clsx } from "clsx";
import { SupportCategory } from "../../types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  return (
    <span
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size])}
    >
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  isOpen: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isOpen }) => {
  return (
    <Badge variant={isOpen ? "info" : "success"}>
      {isOpen ? "Open" : "Closed"}
    </Badge>
  );
};

interface CategoryBadgeProps {
  category: SupportCategory;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getVariant = (
    cat: SupportCategory
  ): "default" | "success" | "warning" | "danger" | "info" => {
    switch (cat) {
      case SupportCategory.TECHNICAL:
        return "info";
      case SupportCategory.BILLING:
        return "warning";
      case SupportCategory.COMPLAINT:
        return "danger";
      case SupportCategory.SECURITY:
        return "danger";
      case SupportCategory.FEATURE_REQUEST:
        return "success";
      default:
        return "default";
    }
  };

  const formatCategory = (cat: SupportCategory): string => {
    return cat
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Badge variant={getVariant(category)}>{formatCategory(category)}</Badge>
  );
};
