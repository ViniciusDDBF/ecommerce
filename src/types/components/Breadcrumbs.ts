type Breadcrumb = {
  id: number;
  name: string;
  path: string;
  slug: string;
  level: number;
};

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  navigate: (path: string) => void;
}
