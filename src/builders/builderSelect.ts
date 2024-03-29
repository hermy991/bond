import { Logging } from "../loggings/logging.ts";
import { BuilderBase } from "./base/BuilderBase.ts";
import { Driver } from "../drivers/mod.ts";
import {
  ParamClauseOptions,
  ParamComplexClauseOptions,
  ParamComplexValues,
  ParamFromOptions,
  ParamSelectColumn,
} from "./params/ParamSelect.ts";
import { ExecutorSelect } from "../executors/ExecutorSelect.ts";

export class BuilderSelect extends BuilderBase {
  #selectData: Array<{ column: string; as?: string }> = [];
  #fromData: ParamFromOptions | null = null;
  #clauseData: ParamComplexClauseOptions[] = [];
  #whereData: string[] = [];
  #groupByData: string[] = [];
  #havingData: string[] = [];
  #orderByData: { column: string; direction?: string }[] = [];
  #paramsData: ParamComplexValues = {};

  /*FLAGS*/
  #distinct = false;

  constructor(public driver: Driver, public logging?: Logging) {
    super(driver, logging);
  }

  selectDistinct(...columns: Array<ParamSelectColumn>): void {
    this.#distinct = true;
    this.select(...columns);
  }

  select(...columns: Array<ParamSelectColumn>): void {
    this.#selectData = [];
    columns.forEach((x) => this.addSelect(x));
  }

  addSelect(...columns: Array<ParamSelectColumn>): void {
    const tempColumns: Array<{ column: string; as?: string }> = [];
    for (let i = 0; i < columns.length; i++) {
      const tempColumn = columns[i];
      if (Array.isArray(tempColumn)) {
        const [column, as] = (tempColumn as [string, string?]);
        tempColumns.push({ column, as });
      } else {
        tempColumns.push(tempColumn as { column: string; as?: string });
      }
    }
    this.#selectData.push(...tempColumns);
  }

  from(req: ParamFromOptions): void {
    this.#fromData = { ...req };
  }

  join(req: ParamClauseOptions, params?: ParamComplexValues): void {
    this.#clauseData.push({ ...req, select: false, join: "inner" });
    if (params) {
      this.addParams(params);
    }
  }

  joinAndSelect(req: ParamClauseOptions, params?: ParamComplexValues): void {
    this.#clauseData.push({ ...req, select: true, join: "inner" });
    if (params) {
      this.addParams(params);
    }
  }

  left(req: ParamClauseOptions, params?: ParamComplexValues): void {
    this.#clauseData.push({ ...req, select: false, join: "left" });
    if (params) {
      this.addParams(params);
    }
  }

  leftAndSelect(req: ParamClauseOptions, params?: ParamComplexValues): void {
    this.#clauseData.push({ ...req, select: true, join: "left" });
    if (params) {
      this.addParams(params);
    }
  }

  right(req: ParamClauseOptions, params?: ParamComplexValues): void {
    this.#clauseData.push({ ...req, select: false, join: "right" });
    if (params) {
      this.addParams(params);
    }
  }

  rightAndSelect(req: ParamClauseOptions, params?: ParamComplexValues): void {
    this.#clauseData.push({ ...req, select: true, join: "right" });
    if (params) {
      this.addParams(params);
    }
  }

  where(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    this.#whereData = [];
    this.addWhere(conditions, params);
  }

  andWhere(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    let tconditions = self.structuredClone(conditions);
    if (Array.isArray(tconditions)) {
      for (let i = 0; i < tconditions.length; i++) {
        tconditions[i] = `AND ${tconditions[i]}`;
      }
    } else tconditions = `AND ${tconditions}`;
    this.addWhere(tconditions, params);
  }

  orWhere(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    let tconditions = self.structuredClone(conditions);
    if (Array.isArray(tconditions)) {
      for (let i = 0; i < tconditions.length; i++) {
        tconditions[i] = `OR ${tconditions[i]}`;
      }
    } else tconditions = `OR ${tconditions}`;
    this.addWhere(tconditions, params);
  }

  addWhere(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    this.#whereData.push(
      ...(Array.isArray(conditions) ? conditions : [conditions]),
    );
    if (params) {
      this.addParams(params);
    }
  }

  groupBy(columns: [string, ...string[]] | string) {
    this.addGroupBy(columns);
  }

  addGroupBy(columns: [string, ...string[]] | string) {
    const tcolumns = Array.isArray(columns) ? columns : [columns];
    tcolumns.forEach((x) => this.#groupByData.push(x));
  }

  having(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    this.#havingData = [];
    this.addHaving(conditions, params);
  }

  andHaving(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    let tconditions = self.structuredClone(conditions);
    if (Array.isArray(tconditions)) {
      for (let i = 0; i < tconditions.length; i++) {
        tconditions[i] = `AND ${tconditions[i]}`;
      }
    } else tconditions = `AND ${tconditions}`;
    this.addHaving(tconditions, params);
  }

  orHaving(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    let tconditions = self.structuredClone(conditions);
    if (Array.isArray(tconditions)) {
      for (let i = 0; i < tconditions.length; i++) {
        tconditions[i] = `OR ${tconditions[i]}`;
      }
    } else tconditions = `OR ${tconditions}`;
    this.addHaving(tconditions, params);
  }

  addHaving(conditions: [string, ...string[]] | string, params?: ParamComplexValues) {
    this.#havingData.push(...(Array.isArray(conditions) ? conditions : [conditions]));
    if (params) {
      this.addParams(params);
    }
  }

  orderBy(...columns: Array<{ column: string; direction?: string }>): void {
    this.#orderByData = [];
    columns.forEach((x) => this.addOrderBy(x));
  }

  addOrderBy(...columns: Array<{ column: string; direction?: string }>): void {
    columns.forEach((x) => this.#orderByData.push(x));
  }

  params(options?: ParamComplexValues): void {
    this.#paramsData = {};
    if (options) {
      this.addParams(options);
    }
  }

  addParams(options: ParamComplexValues): void {
    this.#paramsData = { ...this.#paramsData, ...options };
  }

  getSelectQuery() {
    let sql = `SELECT${this.#distinct ? " DISTINCT" : ""} `;
    if (!this.#selectData.length && this.#fromData) {
      const { schema, entity, as } = <any> this.#fromData;
      if (entity instanceof Function) {
        const te = this.getEntityData(this.driver.options.name, entity);
        let t = this.clearNames([te.schema, te.entity]);
        if (as) {
          t = this.clearNames(as);
        }
        const cols = this.getColumns(this.driver.options.name, entity);
        sql += cols.filter((x) => x.select).map((x) => `${t}."${x.name}" "${x.name}"`).join(", ");
      } else if (entity instanceof ExecutorSelect) {
        const t = this.clearNames(as || "_1");
        sql += `${t}.*`;
      } else {
        const te = this.splitEntity({ entity, schema });
        let t = this.clearNames([te.schema, te.entity]);
        if (as) {
          t = this.clearNames(as);
        }
        sql += `${t}.*`;
      }

      if (this.#clauseData) {
        for (let i = 0; i < this.#clauseData.length; i++) {
          const { select, entity, schema, as } = <any> this.#clauseData[i];
          if (!select) {
            continue;
          }
          if (entity instanceof Function) {
            const te = this.getEntityData(this.driver.options.name, entity);
            let t = this.clearNames([te.schema, te.entity]);
            if (as) {
              t = this.clearNames(as);
            }
            // column list
            const cols = this.getColumns(this.driver.options.name, entity);
            sql += ", " +
              cols.filter((x) => x.select)
                .map((x) => `${t}.${this.clearNames(x.name)} ${this.clearNames(t.replaceAll(`"`, "") + "." + x.name)}`)
                .join(", ");
          } else if (entity instanceof ExecutorSelect) {
            let tas = as ? as : `_${this.#clauseData.filter((o, ix) => !o.as && ix <= i).length + 1}`;
            tas = this.clearNames(tas);
            sql += `, ${tas}.*`;
          } else {
            const te = this.splitEntity({ entity, schema });
            let t = this.clearNames([te.schema, te.entity]);
            if (as) {
              t = this.clearNames(as);
            }
            sql += `, ${t}.*`;
          }
        }
      }
    } else {
      const columns: string[] = [];
      for (let i = 0; i < this.#selectData.length; i++) {
        const { column, as } = this.#selectData[i];
        const tempCol = `${column}` +
          (as ? ` AS ${this.clearNames(as)}` : "");
        columns.push(tempCol);
      }
      sql += `${columns.join(", ")}`;
    }
    return sql;
  }

  getFromQuery() {
    if (!this.#fromData) {
      return ``;
    }
    const { as } = this.#fromData;
    let te: { schema?: string; entity: string } = { entity: "" };
    if (this.#fromData.entity instanceof Function) {
      te = this.getEntityData(this.driver.options.name, this.#fromData.entity);
    } else if (this.#fromData.entity instanceof ExecutorSelect) {
      let query = `( ${this.#fromData.entity.getSql()} )`;
      query = `${query} AS ${this.clearNames([as || "_1"])}`;
      const sql = `FROM ${query}`;
      return sql;
    } else {
      te = <any> this.#fromData;
      te = this.splitEntity(te);
    }
    let query = `${this.clearNames([te.schema, te.entity])}`;
    if (as) {
      query = `${query} AS ${this.clearNames([as])}`;
    }
    const sql = `FROM ${query}`;
    return sql;
  }

  getClauseQuery() {
    if (!this.#clauseData.length) {
      return ``;
    }
    const sqls: string[] = [];
    for (let i = 0; i < this.#clauseData.length; i++) {
      const { join, entity, as, on } = this.#clauseData[i];
      if (entity instanceof ExecutorSelect) {
        const tas = as ? as : `_${this.#clauseData.filter((o, ix) => !o.as && ix <= i).length + 1}`;
        const ton = this.driver.interpolate(on, this.#paramsData);
        sqls.push(`${join.toUpperCase()} JOIN ( ${entity.getSql()} ) AS ${this.clearNames(tas)} ON ${ton.join(" ")}`);
      } else {
        let te: { schema?: string; entity?: string } = <any> this.#clauseData[i];
        if (entity instanceof Function) {
          te = this.getEntityData(this.driver.options.name, entity);
        }
        te = this.splitEntity(<any> te);
        const t = `${this.clearNames([te.schema, te.entity])}`;
        const ton = this.driver.interpolate(on, this.#paramsData);
        sqls.push(`${join.toUpperCase()} JOIN ${t}${as ? " AS " + this.clearNames(as) : ""} ON ${ton.join(" ")}`);
      }
    }
    return sqls.join(" ");
  }

  getWhereQuery() {
    if (!this.#whereData.length) {
      return ``;
    }
    const conditions: string[] = this.driver.interpolate(<[string, ...string[]]> this.#whereData, this.#paramsData);
    return `WHERE ${conditions.join(" ")}`;
  }

  getGroupByQuery() {
    if (!this.#groupByData.length) {
      return ``;
    }
    const groups: string[] = [];
    for (let i = 0; i < this.#groupByData.length; i++) {
      const column = this.#groupByData[i];
      groups.push(column);
    }
    return `GROUP BY ${groups.join(", ")}`;
  }

  getHavingQuery() {
    if (!this.#havingData.length) {
      return ``;
    }
    const conditions: string[] = this.driver.interpolate(<[string, ...string[]]> this.#havingData, this.#paramsData);
    return `HAVING ${conditions.join(" ")}`;
  }

  getOrderByQuery() {
    if (!this.#orderByData.length) {
      return ``;
    }
    const orders: string[] = [];
    for (let i = 0; i < this.#orderByData.length; i++) {
      const { column, direction } = this.#orderByData[i];
      const tempOrder = `${column}${direction ? " " + direction.toUpperCase() : ""}`;
      orders.push(tempOrder);
    }
    return `ORDER BY ${orders.join(", ")}`;
  }

  getSqls(): string[] {
    let sql = `${this.getSelectQuery()} ${this.getFromQuery()}`;
    if (this.#clauseData.length) {
      sql += ` ${this.getClauseQuery()}`;
    }
    if (this.#whereData.length) {
      sql += ` ${this.getWhereQuery()}`;
    }
    if (this.#groupByData.length) {
      sql += ` ${this.getGroupByQuery()}`;
    }
    if (this.#havingData.length) {
      sql += ` ${this.getHavingQuery()}`;
    }
    if (this.#orderByData.length) {
      sql += ` ${this.getOrderByQuery()}`;
    }
    return [sql];
  }
}
