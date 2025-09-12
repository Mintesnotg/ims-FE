import { OperationalStatus } from "../../opreationalstatus";

export interface MenuResponse {
  id: string;
  name: string;
  icon?: string | null;
  url?: string | null;
  parentId?: string | null;
  privilege?: string | null;
  order?: number | null;
}

export interface Pagination<T> {
  $id: string;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: {
    $id: string;
    $values: T[];
  };
}

export type MenuApiResponse = OperationalStatus<Pagination<MenuResponse>>;

export interface ParentMenuData {
  $id: string;
  $values: MenuResponse[];
}

export type ParentMenuApiResponse = OperationalStatus<ParentMenuData>;

export interface MenuRequest {
  name: string;
  parentId?: string | null;
  url?: string | null;
  icon?: string | null;
  Privilege?: string | null;
  order?: number | null;
}
