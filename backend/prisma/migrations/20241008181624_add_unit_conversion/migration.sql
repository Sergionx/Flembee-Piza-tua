-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('FORWARD', 'BACKWARD');

-- CreateTable
CREATE TABLE "UnitConversion" (
    "id" TEXT NOT NULL,
    "from" "Unit" NOT NULL,
    "to" "Unit" NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "direction" "Direction" NOT NULL,

    CONSTRAINT "UnitConversion_pkey" PRIMARY KEY ("id")
);

INSERT INTO "UnitConversion" ("id", "from", "to", "factor", "direction") VALUES
('1', 'KG', 'G', 1000, 'BACKWARD'),
('2', 'L', 'ML', 1000, 'BACKWARD');