export type ColumnTypes =
  | "text"
  | "number"
  | "date"
  | "time"
  | "datetime"
  | "image"
  | "boolean"
  | "tag"
  | "multi-tag"
  | "score";

export interface Salud360Column {
  label: string;
  type: ColumnTypes;
}
