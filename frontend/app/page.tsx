import { CountryList } from "@/types/response.types";
import Link from "next/link";

export default async function Home() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}` + "/countries",
  );
  const countries = await data.json();
  return (
    <>
      <div className="flex flex-col justify-between pt-5 items-center h-screen">
        <h1 className="text-2xl text-blue-50 font-extrabold ">
          Welcome to Country Info App
        </h1>
        <ul
          className="pt-3 border-t-2 h-[90vh] w-[20%] flex flex-col gap-y-5 items-center overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:opacity-0
  [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-opacity-30"
        >
          {countries.map((country: CountryList) => (
            <li key={country.countryCode}>
              <Link
                href={`/country/${country.countryCode.toLowerCase()}`}
                className="p-3 bg-opacity-55 bg-white rounded-lg"
              >
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
