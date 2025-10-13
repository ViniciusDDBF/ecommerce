export interface Breadcrumb {
  id: number;
  level: number;
  name: string;
  path: string;
  slug: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  navigate: (path: string) => void;
}
