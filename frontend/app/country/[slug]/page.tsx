"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CountryInfo } from "@/types/response.types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const chartConfig = {
  population: {
    label: "Population",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function CountryInfoPage() {
  const { slug } = useParams();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/countries/${slug}`,
    fetcher,
  );

  if (!data)
    return (
      <p className="flex items-center text-2xl text-white justify-center h-screen">
        Loading...
      </p>
    );
  if (error || data.populationData === undefined)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-white">
          An error occurred during your request.
        </p>
        <Link href="/">
          <Button>Home</Button>
        </Link>
      </div>
    );

  const chartData = data.populationData.map(
    (item: { year: number; value: number }) => {
      return { year: item.year.toString(), population: item.value };
    },
  );

  return (
    <>
      <div className="flex items-center pt-10 h-screen flex-col">
        <div className="w-[30%] bg-white rounded-lg bg-opacity-65 flex flex-col gap-y-1 items-center justify-center">
          <h1 className="font-bold text-3xl">{data.countryName}</h1>
          <h3 className="font-medium text-md hidden md:block">
            {data.officialName}
          </h3>
          <Image
            src={data.flagUrl}
            alt="flag"
            width={100}
            height={100}
            className="rounded-xl my-1.5"
          />
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
        </div>

        {data.borders.length > 0 && (
          <div className="mt-10 w-[20%] bg-white bg-opacity-35 p-1 rounded-xl h-max">
            <h4 className="text-white md:font-bold md:text-xl font-medium  items-center justify-center flex">
              Border Countries
            </h4>
            <ul
              className="border-y-2  border-white pt-2 flex flex-col gap-y-5 items-center overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:opacity-0
  [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-opacity-30"
            >
              {data.borders.map((country: CountryInfo) => (
                <li key={country.countryCode}>
                  <Link
                    href={`/country/${country.countryCode.toLowerCase()}`}
                    className="p-3 bg-opacity-55 bg-white rounded-lg"
                  >
                    {country.commonName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Card className="w-[40%] mt-2">
          <CardHeader>
            <CardTitle>{data.officialName} Population</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="population"
                  type="natural"
                  stroke="var(--color-population)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-population)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 "></div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
