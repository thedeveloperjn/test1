import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 lg:text-base text-xs font-light text-black sm:pl-0">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-3 w-3 mx-1 text-black/50 " />
          )}
          {index === items.length - 1 ? (
            <span className="text-black capitalize">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-black hover:text-primary capitalize"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
