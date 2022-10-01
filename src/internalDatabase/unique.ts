export type TypeInternalUniqueParam = {
  uniqueName: string;
  entity_ID: number;
  columns: [string | number, ...Array<string | number>];
};

export type TypeInternalUniqueReturn = {
  unique_ID: number;
  uniqueName: string;
  entity_ID: number;
  columnIds: Array<number>;
  columnNames: Array<string>;
};
