export function toEntityNameAndSchema(fullEntityName: string): { entityName: string; schema?: string } {
  if (fullEntityName.indexOf(".") >= 0) {
    const array = fullEntityName.split(".");
    const entityName = array[array.length - 1];
    const schema = array.slice(0, array.length - 1).map((x) => x.replace(/[ ]/ig, "")).join(".");
    return { entityName, schema };
  }
  return { entityName: fullEntityName };
}
