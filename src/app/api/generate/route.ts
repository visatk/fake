import { NextRequest, NextResponse } from "next/server";
import {
  fakerEN_US,
  fakerEN_GB,
  fakerEN_CA,
  fakerEN_AU,
  fakerDE,
  fakerFR,
  fakerIT,
  fakerES,
} from "@faker-js/faker";

const localeMap: Record<string, any> = {
  US: fakerEN_US,
  GB: fakerEN_GB,
  CA: fakerEN_CA,
  AU: fakerEN_AU,
  DE: fakerDE,
  FR: fakerFR,
  IT: fakerIT,
  ES: fakerES,
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const country = searchParams.get("country")?.toUpperCase() || "US";

  const faker = localeMap[country] || fakerEN_US;

  const identity = {
    fullName: faker.person.fullName(),
    gender: faker.person.sex(),
    dob: faker.date.birthdate({ min: 18, max: 65, mode: "age" }).toISOString().split("T")[0],
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    creditCard: {
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      issuer: faker.finance.creditCardIssuer(),
    },
  };

  return NextResponse.json(identity, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  });
}
