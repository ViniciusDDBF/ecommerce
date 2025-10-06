interface IBreadcrumb {
  id: number;
  name: string;
  path: string;
  slug: string;
  level: number;
};

export interface BreadcrumbsProps {
  breadcrumbs: IBreadcrumb[];
  navigate: (path: string) => void;
}
