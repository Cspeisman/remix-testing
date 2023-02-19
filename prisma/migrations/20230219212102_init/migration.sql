-- CreateTable
CREATE TABLE "Greeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greeting" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Greeting_greeting_key" ON "Greeting"("greeting");
