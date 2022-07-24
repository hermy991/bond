export type TypeIndexedEntity = {
  type: "entity";
  value: { name: string; schema?: string };
};

export type TypeSaveProps = TypeIndexedEntity;
