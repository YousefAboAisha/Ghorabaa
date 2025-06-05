"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../inputs/button";
import { Gender } from "@/app/enums";
import Select from "../inputs/selectInput";
import { CitiesData } from "@/data/citiesData";
import { CountriesData } from "@/data/countriesData";
import { GiFemale, GiMale } from "react-icons/gi";
import Input from "../inputs/input";
import { CiSearch } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import { GrClearOption } from "react-icons/gr";

type SearchFilterProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchFilters = ({ setIsOpen }: SearchFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [gender, setGender] = useState<Gender | undefined>(() => {
    const g = searchParams.get("gender");
    return g === Gender.MALE || g === Gender.FEMALE ? (g as Gender) : undefined;
  });

  const [age, setAge] = useState(() => ({
    from: Number(searchParams.get("ageFrom") || 0),
    to: Number(searchParams.get("ageTo") || 0),
  }));

  const [city, setCity] = useState<string>(
    () => searchParams.get("city") || ""
  );
  const [neighborhood, setNeighborhood] = useState<string>(
    () => searchParams.get("neighborhood") || ""
  );

  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);

  useEffect(() => {
    if (city) {
      const cityObj = CitiesData.find((c) => c[city as keyof typeof c]);
      setCities(cityObj ? cityObj[city as keyof typeof cityObj] || [] : []);
    }
  }, [city]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (gender) params.set("gender", gender);
    if (age.from) params.set("ageFrom", age.from.toString());
    if (age.to) params.set("ageTo", age.to.toString());
    if (city) params.set("city", city);
    if (neighborhood) params.set("neighborhood", neighborhood);

    router.push(`/stories?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setGender(undefined);
    setAge({ from: 0, to: 0 });
    setCity("");
    setNeighborhood("");
    setCities([]);
    router.push("/stories"); // remove search params
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-fit">
          <CiSearch size={25} />
          <h2 className="text-xl font-semibold">معايير البحث</h2>
        </div>

        <div>
          <Button
            onClick={handleClearFilters}
            title="مسح معايير البحث"
            className="bg-[red] white w-fit px-4"
            icon={<GrClearOption size={16} />}
          />
        </div>
      </div>

      <hr className="my-4" />

      {/* Gender selection */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div
          onClick={() => setGender(Gender.MALE)}
          className={`flex flex-col items-center justify-center gap-2 p-6 bg-background_light border rounded-md cursor-pointer w-full ${
            gender === Gender.MALE && "bg-secondary text-white"
          }`}
        >
          <GiMale size={30} />
          <h2>ذكر</h2>
        </div>

        <div
          onClick={() => setGender(Gender.FEMALE)}
          className={`flex flex-col items-center justify-center gap-2 p-6 bg-background_light border rounded-md cursor-pointer w-full ${
            gender === Gender.FEMALE && "bg-secondary text-white"
          }`}
        >
          <GiFemale size={30} />
          <h2>أنثى</h2>
        </div>
      </div>

      {/* Age inputs */}
      <div className="flex items-center gap-2 mt-6">
        <Input
          label="العُمر الابتدائي"
          placeholder="مثال: 14"
          type="number"
          className="focus:border-secondary"
          required={false}
          value={age.from || ""}
          onChange={(e) =>
            setAge((prev) => ({ ...prev, from: Number(e.target.value) }))
          }
        />

        <Input
          label="العُمر النهائي"
          placeholder="مثال: 28"
          type="number"
          className="focus:border-secondary"
          required={false}
          value={age.to || ""}
          onChange={(e) =>
            setAge((prev) => ({ ...prev, to: Number(e.target.value) }))
          }
        />
      </div>

      {/* City and neighborhood */}
      <div className="flex flex-col gap-2 mt-6">
        <Select
          label="المدينة"
          title="اختر المدينة"
          options={CountriesData}
          className="focus:border-secondary"
          required={false}
          value={city}
          onChange={(e) => {
            const selectedCity = e.target.value;
            setCity(selectedCity);
            const cityObj = CitiesData.find(
              (c) => c[selectedCity as keyof typeof c]
            );
            setCities(
              cityObj ? cityObj[selectedCity as keyof typeof cityObj] || [] : []
            );
          }}
        />

        <Select
          label="الحي"
          title="اختر الحي"
          options={cities}
          className="focus:border-secondary"
          required={false}
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      {/* Apply button */}
      <Button
        onClick={handleApplyFilters}
        title="تطبيق معايير البحث"
        className="bg-secondary text-white mt-8"
      />
    </div>
  );
};

export default SearchFilters;
