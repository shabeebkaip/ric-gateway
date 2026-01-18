"use client";

import { motion } from "framer-motion";
import {
  FileText,
  List,
  Package,
  Users,
  Building2,
  Mail,
  Phone,
  Link as LinkIcon,
  Info,
  Boxes,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Fields that are already handled by other components
const EXCLUDED_FIELDS = [
  "id",
  "name",
  "brand",
  "partnerId",
  "category",
  "sub_category",
  "product_type",
  "is_parent_product",
  "images",
  "description",
  "features",
  "applications",
  "key_benefits",
  "certifications",
  "regulatory",
  "technical_specifications",
  "variants",
  "show_image_main",
];

// Icon mapping for different field types
const FIELD_ICONS: Record<string, any> = {
  accessories: Package,
  accessories_included: Package,
  combinations: Boxes,
  variants: Boxes,
  advantages_for_surgeon: Users,
  benefits_for_patient: Users,
  clinical_benefits: Users,
  distributor: Building2,
  manufacturer: Building2,
  support_contact: Phone,
  additional_info: Info,
  system_components: Settings,
  mechanism_of_action: FileText,
  clearances_certifications: FileText,
  references: LinkIcon,
};

interface DynamicProductFieldsProps {
  product: any;
}

export function DynamicProductFields({ product }: DynamicProductFieldsProps) {
  // Helper function to check if a value is empty
  const isEmptyValue = (value: any): boolean => {
    if (value === null || value === undefined || value === "") return true;

    // Check if array is empty
    if (Array.isArray(value)) return value.length === 0;

    // Check if object has all empty values
    if (typeof value === "object") {
      return Object.values(value).every((v) => isEmptyValue(v));
    }

    return false;
  };

  // Get all fields that aren't already displayed and have non-empty values
  const dynamicFields = Object.entries(product).filter(
    ([key, value]) => !EXCLUDED_FIELDS.includes(key) && !isEmptyValue(value),
  );

  if (dynamicFields.length === 0) return null;

  const formatFieldName = (key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getFieldIcon = (key: string) => {
    const Icon = FIELD_ICONS[key] || List;
    return Icon;
  };

  const renderFieldValue = (value: any, depth = 0): JSX.Element => {
    // Handle null/undefined
    if (value === null || value === undefined || value === "") {
      return (
        <span className="text-slate-400 text-sm italic">Not specified</span>
      );
    }

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-slate-400 text-sm italic">None</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-xs px-3 py-1"
            >
              {typeof item === "object" ? JSON.stringify(item) : String(item)}
            </Badge>
          ))}
        </div>
      );
    }

    // Handle objects
    if (typeof value === "object") {
      return (
        <div className="space-y-3 bg-slate-50 rounded-lg p-4 border border-slate-200">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="grid grid-cols-3 gap-4">
              <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide col-span-1">
                {formatFieldName(subKey)}
              </dt>
              <dd className="text-sm text-slate-800 col-span-2 font-medium">
                {renderFieldValue(subValue, depth + 1)}
              </dd>
            </div>
          ))}
        </div>
      );
    }

    // Handle primitive values
    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? "default" : "secondary"} className="text-xs">
          {value ? "Yes" : "No"}
        </Badge>
      );
    }

    // Handle URLs
    if (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline text-sm inline-flex items-center gap-1 break-all"
        >
          <LinkIcon className="w-3 h-3 flex-shrink-0" />
          <span>{value}</span>
        </a>
      );
    }

    // Handle email
    if (typeof value === "string" && value.includes("@")) {
      return (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-700 underline text-sm inline-flex items-center gap-1"
        >
          <Mail className="w-3 h-3 flex-shrink-0" />
          <span>{value}</span>
        </a>
      );
    }

    // Handle phone
    if (
      typeof value === "string" &&
      (value.startsWith("+") || value.match(/^\d{3}[-\s]?\d{3}[-\s]?\d{4}/))
    ) {
      return (
        <a
          href={`tel:${value.replace(/\s/g, "")}`}
          className="text-blue-600 hover:text-blue-700 underline text-sm inline-flex items-center gap-1"
        >
          <Phone className="w-3 h-3 flex-shrink-0" />
          <span>{value}</span>
        </a>
      );
    }

    return (
      <span className="text-sm text-slate-800 leading-relaxed font-medium">
        {String(value)}
      </span>
    );
  };

  const getCardColor = (index: number) => {
    const colors = [
      { bg: "bg-blue-100", text: "text-blue-600" },
      { bg: "bg-sky-100", text: "text-sky-600" },
      { bg: "bg-emerald-100", text: "text-emerald-600" },
      { bg: "bg-violet-100", text: "text-violet-600" },
      { bg: "bg-amber-100", text: "text-amber-600" },
      { bg: "bg-rose-100", text: "text-rose-600" },
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-emerald-100">
              <Info className="w-6 h-6 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900">
              Additional Product Information
            </h2>
          </div>
          <p className="text-slate-600 max-w-2xl">
            Comprehensive details and specifications
          </p>
        </motion.div>

        <div className="space-y-6">
          {dynamicFields.map(([key, value], index) => {
            const Icon = getFieldIcon(key);
            const colors = getCardColor(index);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl ${colors.bg}`}>
                      <Icon
                        className={`w-5 h-5 ${colors.text}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {formatFieldName(key)}
                    </h3>
                  </div>
                  <div className="pl-0">{renderFieldValue(value)}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
