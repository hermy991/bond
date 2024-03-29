import * as path from "std/path/mod.ts";
import { Driver } from "../drivers/mod.ts";
import { Logging } from "../loggings/logging.ts";
import { ParamColumnDefinition } from "../builders/params/ParamColumn.ts";
import { ParamCheck } from "../builders/params/ParamCheck.ts";
import { ParamUnique } from "../builders/params/ParamUnique.ts";
import { ParamRelationCreate } from "../builders/params/ParamRelation.ts";
import {
  ParamCreateAfter,
  ParamCreateData,
  ParamCreateEntity,
  ParamCreateNext,
} from "../builders/params/ParamCreate.ts";
import { BuilderCreate } from "../builders/BuilderCreate.ts";

export class ExecutorCreate {
  cb: BuilderCreate = new BuilderCreate(<Driver> {});
  constructor(public conn: Driver, public logging?: Logging) {
    this.cb = new BuilderCreate(conn, logging);
  }

  create(req: ParamCreateEntity): ExecutorCreate {
    this.cb.create(req);
    return this;
  }

  columns(columns: Array<ParamColumnDefinition>): ExecutorCreate {
    this.cb.columns(columns);
    return this;
  }

  addColumn(column: ParamColumnDefinition): ExecutorCreate {
    this.cb.addColumn(column);
    return this;
  }

  checks(checks: Array<ParamCheck>): ExecutorCreate {
    this.cb.checks(checks);
    return this;
  }

  addCheck(check: ParamCheck): ExecutorCreate {
    this.cb.addCheck(check);
    return this;
  }

  uniques(uniques: Array<ParamUnique>): ExecutorCreate {
    this.cb.uniques(uniques);
    return this;
  }

  addUnique(unique: ParamUnique): ExecutorCreate {
    this.cb.addUnique(unique);
    return this;
  }

  relations(relations: Array<ParamRelationCreate>): ExecutorCreate {
    this.cb.relations(relations);
    return this;
  }

  addRelation(relation: ParamRelationCreate): ExecutorCreate {
    this.cb.addRelation(relation);
    return this;
  }

  data(data: ParamCreateData[] | ParamCreateData): ExecutorCreate {
    this.cb.data(data);
    return this;
  }

  addData(data: ParamCreateData[] | ParamCreateData): ExecutorCreate {
    this.cb.addData(data);
    return this;
  }

  next(data: ParamCreateNext[] | ParamCreateNext): ExecutorCreate {
    this.cb.next(data);
    return this;
  }

  addNext(data: ParamCreateNext[] | ParamCreateNext): ExecutorCreate {
    this.cb.addNext(data);
    return this;
  }

  after(data: ParamCreateAfter[] | ParamCreateAfter): ExecutorCreate {
    this.cb.after(data);
    return this;
  }

  addAfter(data: ParamCreateAfter[] | ParamCreateAfter): ExecutorCreate {
    this.cb.addAfter(data);
    return this;
  }

  printSql(): ExecutorCreate {
    this.cb.printSql();
    return this;
  }

  getSqls(): string[] {
    const sqls = this.cb.getSqls();
    return sqls;
  }

  getSql(): string {
    const sqls = this.getSqls();
    return sqls.join(";\n");
  }

  async execute(): Promise<any> {
    const query = this.getSqls();
    this.cb.usePrintSql(query);
    if (this.logging) {
      await this.logging.write({
        logginKey: `schema`,
        file: path.fromFileUrl(import.meta.url),
        className: this.constructor.name,
        functionName: `execute`,
        outLine: query.join(";").replace(/\n/ig, " "),
      });
    }
    return await this.conn.execute(query.join(";\n"));
  }
}
