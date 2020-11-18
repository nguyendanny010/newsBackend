# Migration `20201118010022-init`

This migration has been generated by dannny at 11/17/2020, 5:00:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201118010022-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,21 @@
+// 1
+// Datasource tells prisma we are using SQLite for our database connection.
+datasource db {
+  provider = "sqlite" 
+  url = "***"
+}
+
+// 2
+// Generator indicates that we want to generatoe a Prisma Client.
+generator client {
+  provider = "prisma-client-js"
+}
+
+// 3
+// We have written our link as a model
+model Link {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  description String
+  url         String
+}
```

