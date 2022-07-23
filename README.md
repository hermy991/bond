# Bond

Bond is a ORM that can run in deno platforms and can be use with JavaScript and TypeScript. From small applications with
a few tables to large scale enterprise applications with multiple databases.

## Features

- [ ] [Entities and columns](#entities-and-columns)
- [ ] Clean object relational model
- [ ] Associations (relations)
  - [ ] Uni-directional relations
  - [ ] Bi-directional relations
  - [ ] Self-referenced relations
- [ ] Supports multiple inheritance patterns
- [ ] Cascades
- [ ] Indices
- [ ] Transactions
- [ ] Connection pooling
- [ ] Replication
- [ ] Using multiple database connections
- [ ] Elegant-syntax, flexible and powerful QueryBuilder
- [ ] Left and inner joins
- [ ] Proper pagination for queries using joins
- [ ] Query caching
- [ ] Streaming raw results
- [ ] Logging
- [ ] Listeners and subscribers (hooks)
- [ ] Schema declaration in models or separate configuration files
- [ ] Connection configuration in json / xml / yml / yaml / env formats
- [ ] Database supports
  - [ ] Postgresql
  - [ ] MySql / MariaDB
  - [ ] Microsoft Sql Server
  - [ ] Oracle
- [ ] Works in platforms
  - [ ] Deno
  - [ ] Browser
- [ ] Language support
  - [ ] JavaScript
  - [ ] TypeScript
- [ ] Migrations and automatic migrations generation
- [ ] CLI
  - [ ] Code First
  - [ ] Database First

## Entities and columns

Entity object that maps to a database table. You can create an entity by defining a new object and using it with
`createEntity()` function:

```typescript
import { createEntity } from "https://deno.land/x/bond/mod.ts";

const user = createEntity({
  entity: "user",
  schema: "testing",
  columns: {
    firstName: { type: "string", default: "Hermy" },
    lastName: { type: "string", default: "Garcia" },
  },
});

export default user;
```

Bond is very flexible, you could define entity in many ways.

```typescript
import { createEntity } from "https://deno.land/x/bond/mod.ts";

const user = createEntity({
  entity: "testing.user",
  columns: [
    { name: "firstName", type: "string", default: "Hermy" },
    { name: "lastName", type: "string", default: "Garcia" },
  ],
});

export default user;
```

You can create an entity by defining a new class and using it with `Entity()` function:

```typescript
import { Column, Entity } from "https://deno.land/x/bond/mod.ts";

@Entity({ name: "user", scheme: "testing" })
export class User {
  @Column()
  firstName: string = "Hermy";

  @Column()
  lastName: string = "Garcia";
}
```
