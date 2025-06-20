export interface MappedItem {
  id: string;
  name: string;
}
export interface GroupData {
  groups :Group[]; 
  total: number;
}
export interface Group {
  id : string;
  title: string;
  group_type: string;
  mapped_data: MappedItem[];
}
