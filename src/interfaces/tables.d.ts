import { ColumnDef, Table } from "@tanstack/react-table";
import { CSSProperties, ReactNode } from "react";

export interface IStyle extends CSSProperties {
  mobileMinWidth?: number;
  mobileMaxWidth?: number;
  mobileWidth?: number;
}

export interface IVisibleFields {
  name: string;
  as: string;
  format?: boolean;
  type?: string;
  show?: boolean;
  modalVisibility?: boolean;
  mobileVisibility?: boolean;
  style?: IStyle;
  customCell?: any;
  sortable?: any;
  Header?: ReactNode;
}

export interface ITable {
  table: Table<any>;
  data: any[];
  noScroll?: boolean;
  addRowStyle?: (row: any) => CSSProperties;
}

export interface UseTableProps<T> {
  columns: ColumnDef<T, any>[];
  initialData: T[];
  noScroll?: boolean;
  enableYScroll?: boolean;
  addRowStyle?: (row: T) => React.CSSProperties;
  rowBackgroundColor?: string;
}
