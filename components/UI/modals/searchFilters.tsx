import React, { useState } from "react";
import Button from "../inputs/button";
import { FaSearch } from "react-icons/fa";
import { Gender } from "@/app/enums";
import Select from "../inputs/selectInput";
import { CitiesData } from "@/data/citiesData";
import { CountriesData } from "@/data/countriesData";
import { GiFemale, GiMale } from "react-icons/gi";
import Input from "../inputs/input";

const SearchFilters = () => {
  const [gender, setGender] = useState<Gender>();
  const [age, setAge] = useState({
    from: Number,
    to: Number,
  });

  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <FaSearch size={25} />
        <h2 className="text-xl font-bold">فلترة البحث</h2>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div
          onClick={() => setGender(Gender.MALE)}
          className={`flex flex-col items-center justify-center gap-2 p-6 bg-background_light border rounded-md cursor-pointer hover:border-secondary duration-100 w-full ${
            gender == Gender.MALE && "border-secondary"
          }`}
        >
          <GiMale size={30} />
          <h2>ذكر</h2>
        </div>

        <div
          onClick={() => setGender(Gender.FEMALE)}
          className={`flex flex-col items-center justify-center gap-2 p-6 bg-background_light border rounded-md cursor-pointer hover:border-secondary duration-100 w-full ${
            gender == Gender.FEMALE && "border-secondary"
          }`}
        >
          <GiFemale size={30} />
          <h2>أنثى</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <div className="flex items-center gap-2 text-sm">
          <Input
            label="العُمر الابتدائي"
            placeholder="مثال: 14"
            type="number"
            className="focus:border-secondary"
            required={false}
          />
        </div>

        <div className="flex items-center gap-2t text-sm">
          <Input
            label="العُمر النهائي"
            placeholder="مثال: 28"
            type="number"
            className="focus:border-secondary"
            required={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <Select
          label="المدينة"
          title="اختر المدينة"
          options={CountriesData}
          onChange={(e) => {
            const selectedCity = e.target.value;

            // Find the city object that contains the selected city
            const cityObj = CitiesData.find(
              (city) => city[selectedCity as keyof typeof city]
            );

            // If found, update the cities state
            setCities(
              cityObj ? cityObj[selectedCity as keyof typeof cityObj] || [] : []
            );
          }}
          className={`focus:border-secondary`}
          required={false}
        />
        <Select
          label="الحي"
          options={cities}
          title="اختر الحي"
          className={`focus:border-secondary`}
          required={false}
        />
      </div>

      <Button
        title="تطبيق معايير البحث"
        className="bg-secondary text-white mt-4"
      />
    </div>
  );
};

export default SearchFilters;
