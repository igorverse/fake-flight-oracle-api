-- CreateTable
CREATE TABLE "flight" (
    "flightnumber" INTEGER NOT NULL,
    "airlinecompany" VARCHAR(255) NOT NULL,
    "departuredate" VARCHAR(255) NOT NULL,
    "premium" DOUBLE PRECISION NOT NULL,
    "payout" DOUBLE PRECISION NOT NULL,
    "isdelayedorcanceled" BOOLEAN NOT NULL,

    CONSTRAINT "flight_pkey" PRIMARY KEY ("flightnumber")
);
