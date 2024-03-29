import { Logging } from "../loggings/logging.ts";
import { BuilderBase } from "./base/BuilderBase.ts";
import { Driver } from "../drivers/mod.ts";
import { ParamComplexValues } from "./params/ParamSelect.ts";

export class BuilderDelete extends BuilderBase {
  #entityData: { entity: string; schema?: string } | Function | null = null;
  #whereData: Array<string> = [];
  #paramsData: ParamComplexValues = {};

  constructor(public driver: Driver, public logging?: Logging) {
    super(driver, logging);
  }

  delete(
    req: { entity: string; schema?: string } | [string, string?] | Function,
  ): void {
    if (Array.isArray(req)) {
      const [entity, schema] = req;
      this.#entityData = { entity, schema };
    } else {
      this.#entityData = req;
    }
  }

  where(
    conditions: [string, ...string[]] | string,
    params?: ParamComplexValues,
  ) {
    this.#whereData = [];
    this.addWhere(conditions, params);
  }

  andWhere(
    conditions: [string, ...string[]] | string,
    params?: ParamComplexValues,
  ) {
    let tconditions = self.structuredClone(conditions);
    if (Array.isArray(tconditions)) {
      for (let i = 0; i < tconditions.length; i++) {
        tconditions[i] = `AND ${tconditions[i]}`;
      }
    } else tconditions = `AND ${tconditions}`;
    this.addWhere(tconditions, params);
  }

  orWhere(
    conditions: [string, ...string[]] | string,
    params?: ParamComplexValues,
  ) {
    let tconditions = self.structuredClone(conditions);
    if (Array.isArray(tconditions)) {
      for (let i = 0; i < tconditions.length; i++) {
        tconditions[i] = `OR ${tconditions[i]}`;
      }
    } else tconditions = `OR ${tconditions}`;
    this.addWhere(tconditions, params);
  }

  addWhere(
    conditions: [string, ...string[]] | string,
    params?: ParamComplexValues,
  ) {
    this.#whereData.push(
      ...(Array.isArray(conditions) ? conditions : [conditions]),
    );
    if (params) {
      this.addParams(params);
    }
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

  getEntityQuery() {
    if (!this.#entityData) {
      return ``;
    }
    let e: { schema?: string; entity?: string } = {};
    if (this.#entityData instanceof Function) {
      e = this.getEntityData(
        this.driver.options.name,
        this.#entityData,
      );
    } else {
      e = this.#entityData;
    }
    const query = `${this.clearNames([e.schema, e.entity])}`;
    return `DELETE FROM ${query}`;
  }

  getWhereQuery(): string {
    if (!this.#whereData.length) {
      return ``;
    }
    const conditions: string[] = this.driver.interpolate(
      <[string, ...string[]]> this.#whereData,
      this.#paramsData,
    );
    return `WHERE ${conditions.join(" ")}`;
  }

  getSqls(): string[] {
    if (!this.#entityData) {
      return [];
    }
    let sql: string = this.getEntityQuery();
    if (this.#whereData.length) {
      sql += ` ` + this.getWhereQuery();
    }
    return [sql];
  }
}
