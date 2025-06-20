export interface MappedItem {
  id: string;
  name: string;
}

export interface GroupData {
  id : string;
  title: string;
  group_type: string;
  mapped_data: MappedItem[];
}
