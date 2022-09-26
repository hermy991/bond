export function toEntityNameAndSchema(fullEntityName: string): { entityName: string; schema?: string } {
  if (fullEntityName.indexOf(".") >= 0) {
    const [schema, entityName] = fullEntityName.split(".");
    return { entityName, schema };
  }
  return { entityName: fullEntityName };
}
