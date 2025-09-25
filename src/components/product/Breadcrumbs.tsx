import { ChevronRight } from 'lucide-react';
import React from 'react';

interface Breadcrumb {
  id: number;
  name: string;
  path: string;
  slug: string;
  level: number;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  navigate: (path: string) => void;
}

export default function Breadcrumbs({
  breadcrumbs,
  navigate,
}: BreadcrumbsProps) {
  if (!breadcrumbs?.length) return null;

  return (
    <nav className="mb-4 sm:mb-6">
      <ol className="text-charcoal-400 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id}>
            {index !== 0 && (
              <li>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </li>
            )}
            <li className="flex items-center">
              {index === breadcrumbs.length - 1 ? (
                <span className="text-charcoal-300 font-medium">
                  {crumb.name}
                </span>
              ) : (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="hover:text-ember-400 cursor-pointer transition-colors"
                >
                  {crumb.name}
                </button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
