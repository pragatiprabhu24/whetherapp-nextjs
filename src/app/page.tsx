"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
import { Loader } from "@/components/Loader";
import { format, parseISO } from "date-fns";
import { MainContainer } from "@/components/MainContainer";
import { converter } from "@/utils/converter";
import { WeatherIcon } from "@/components/WeatherIcon";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        ` https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`
      );
      return data;
    }
  );
  const day = data?.list[0];
  console.log(data);

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-4 bg-gray-900 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-4 text-2xl items-end">
              <p className="text-white">
                {format(parseISO(day?.dt_txt ?? ""), "EEEE")}
              </p>
              <p className="text-white text-lg">
                ({format(parseISO(day?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <MainContainer className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 text-white">
                <span className="text-5xl">
                  {converter(day?.main.temp ?? 296.37)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{converter(day?.main.feels_like ?? 296.37)}°</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {converter(day?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {converter(day?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs text-white font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    <WeatherIcon iconName={d.weather[0].icon} />
                    <p>{converter(d.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </MainContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
