"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../inputs/button";
import { Gender } from "@/app/enums";
import Select from "../inputs/selectInput";
import { CitiesData } from "@/data/citiesData";
import { CountriesData } from "@/data/countriesData";
import Input from "../inputs/input";
import { CiSearch } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import { GrClearOption } from "react-icons/gr";
import * as yup from "yup";
import { GenderData } from "@/data/genderData";

type SearchFilterProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// Define validation schema
const filterSchema = yup.object().shape({
  gender: yup.mixed<Gender>().oneOf(Object.values(Gender)),
  age: yup.object().shape({
    from: yup
      .number()
      .typeError("يجب أن يكون العمر رقماً")
      .min(0, "العمر الابتدائي لا يمكن أن يكون أقل من 0")
      .max(120, "العمر الابتدائي لا يمكن أن يكون أكثر من 120")
      .test(
        "is-less-than-to",
        "العمر الابتدائي يجب أن يكون أقل من أو يساوي العمر النهائي",
        function (value) {
          const { to } = this.parent;
          return !value || !to || value <= to;
        }
      ),
    to: yup
      .number()
      .typeError("يجب أن يكون العمر رقماً")
      .min(0, "العمر النهائي لا يمكن أن يكون أقل من 0")
      .max(120, "العمر النهائي لا يمكن أن يكون أكثر من 120"),
  }),

  date: yup.object().shape({
    day: yup
      .number()
      .typeError("يجب أن يكون اليوم رقماً")
      .min(0, "اليوم لا يمكن أن يكون أقل من 0")
      .max(31, "اليوم لا يمكن أن يكون أكثر من 31"),

    month: yup
      .number()
      .typeError("يجب أن يكون الشهر رقماً")
      .min(0, "الشهر لا يمكن أن يكون أقل من 0")
      .max(12, "الشهر لا يمكن أن يكون أكثر من 12"),

    year: yup
      .number()
      .typeError("يجب أن يكون السنة رقماً")
      .min(0, "السنة لا يمكن أن يكون أقل من 0")
      .max(new Date().getFullYear(), "لا يمكن اختيار سنة لم تأتِ بعد"),
  }),
  city: yup.string(),
  neighborhood: yup.string().when("city", {
    is: (city: string) => !!city,
    then: (schema) => schema.required("يجب اختيار الحي عند اختيار المدينة"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

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

  const [date, setDate] = useState(() => ({
    day: Number(searchParams.get("day") || 0),
    month: Number(searchParams.get("month") || 0),
    year: Number(searchParams.get("year") || 0),
  }));

  const [city, setCity] = useState<string>(
    () => searchParams.get("city") || ""
  );

  const [neighborhood, setNeighborhood] = useState<string>(
    () => searchParams.get("neighborhood") || ""
  );

  const [cities, setCities] = useState<{ value: string; title: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (city) {
      const cityObj = CitiesData.find((c) => c[city as keyof typeof c]);
      setCities(cityObj ? cityObj[city as keyof typeof cityObj] || [] : []);
    }
  }, [city]);

  const validateForm = async () => {
    try {
      await filterSchema.validate(
        {
          gender,
          age,
          city,
          neighborhood,
          date,
        },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleApplyFilters = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const params = new URLSearchParams();

    if (gender) params.set("gender", gender);

    if (age.from) params.set("ageFrom", age.from.toString());
    if (age.to) params.set("ageTo", age.to.toString());

    if (date.day) params.set("day", date.day.toString());
    if (date.month) params.set("month", date.month.toString());
    if (date.year) params.set("year", date.year.toString());

    if (city) params.set("city", city);
    if (neighborhood) params.set("neighborhood", neighborhood);

    router.push(`/stories?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setGender(undefined);
    setAge({ from: 0, to: 0 });
    setDate({ day: 0, month: 0, year: 0 });
    setCity("");
    setNeighborhood("");
    setCities([]);
    setErrors({});
    router.push("/stories");
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
            title="مسح المحددات"
            className="bg-white !border-gray_light !text-rejected shadow-none hover:shadow-sm duration-150 w-fit px-4 !text-[10px]"
            icon={<GrClearOption size={12} />}
          />
        </div>
      </div>

      <hr className="my-4" />

      {/* Gender selection */}
      <div className="mt-4">
        <div className="relative">
          <div
            onClick={() => setGender(undefined)}
            className="absolute z-10 top-[44%] left-2 rounded-xl flex items-center justify-center p-2 cursor-pointer hover:bg-[#eaeaea] duration-200"
          >
            <GrClearOption
              title="مسح محدد البحث "
              size={15}
              className="text-rejected "
            />
          </div>
          <Select
            label="الجنس"
            title="اختر جنس الشهيد.."
            options={GenderData}
            className="focus:border-secondary"
            required={false}
            value={gender || ""}
            onChange={(e) => {
              setGender(e.target.value as Gender);
              if (errors["gender"]) {
                setErrors((prev) => ({ ...prev, gender: "" }));
              }
            }}
            error={errors["gender"]}
          />{" "}
        </div>

        {errors["gender"] && (
          <p className="text-rejected text-xs mt-1">{errors["gender"]}</p>
        )}
      </div>

      {/* Age inputs */}
      <div className="cards-grid-2 mt-6">
        <Input
          label="العُمر الابتدائي"
          placeholder="مثال: 14"
          type="number"
          className="focus:border-secondary w-full"
          required={false}
          value={age.from || ""}
          onChange={(e) => {
            setAge((prev) => ({ ...prev, from: Number(e.target.value) }));
            if (errors["age.from"]) {
              setErrors((prev) => ({ ...prev, "age.from": "" }));
            }
          }}
          error={errors["age.from"]}
          min={0}
        />

        <Input
          label="العُمر النهائي"
          placeholder="مثال: 28"
          type="number"
          className="focus:border-secondary w-full"
          required={false}
          value={age.to || ""}
          onChange={(e) => {
            setAge((prev) => ({ ...prev, to: Number(e.target.value) }));
            if (errors["age.to"]) {
              setErrors((prev) => ({ ...prev, "age.to": "" }));
            }
          }}
          error={errors["age.to"]}
          min={1}
        />
      </div>

      {/* City and neighborhood */}
      <div className="flex flex-col gap-2 mt-6">
        <div className="relative">
          <div
            onClick={() => setCity("")}
            className="absolute z-10 top-[44%] left-2 rounded-xl flex items-center justify-center p-2 cursor-pointer hover:bg-[#eaeaea] duration-200"
          >
            <GrClearOption
              title="مسح محدد البحث "
              size={15}
              className="text-rejected "
            />
          </div>

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
                cityObj
                  ? cityObj[selectedCity as keyof typeof cityObj] || []
                  : []
              );
              if (errors["neighborhood"]) {
                setErrors((prev) => ({ ...prev, neighborhood: "" }));
              }
              if (errors["city"]) {
                setErrors((prev) => ({ ...prev, city: "" }));
              }
            }}
            error={errors["city"]}
          />
        </div>

        <div className="relative">
          <div
            onClick={() => setNeighborhood("")}
            className="absolute z-10 top-[44%] left-2 rounded-xl flex items-center justify-center p-2 cursor-pointer hover:bg-[#eaeaea] duration-200"
          >
            {" "}
            <GrClearOption
              title="مسح محدد البحث "
              size={15}
              className="text-rejected "
            />
          </div>
          <Select
            label="الحي"
            title="اختر الحي"
            options={cities}
            className="focus:border-secondary"
            required={false}
            value={neighborhood}
            onChange={(e) => {
              setNeighborhood(e.target.value);
              if (errors["neighborhood"]) {
                setErrors((prev) => ({ ...prev, neighborhood: "" }));
              }
            }}
            error={errors["neighborhood"]}
          />{" "}
        </div>
      </div>

      {/* Date inputs */}
      <div className="cards-grid-3 mt-6">
        <Input
          label="يوم الاستشهاد"
          placeholder="مثال: 17"
          type="number"
          className="focus:border-secondary w-full"
          required={false}
          value={date.day || ""}
          onChange={(e) => {
            setDate((prev) => ({ ...prev, day: Number(e.target.value) }));
            if (errors["date.day"]) {
              setErrors((prev) => ({ ...prev, "date.day": "" }));
            }
          }}
          error={errors["date.day"]}
        />

        <Input
          label="شهر الاستشهاد"
          placeholder="مثال: 9"
          type="number"
          className="focus:border-secondary w-full"
          required={false}
          value={date.month || ""}
          onChange={(e) => {
            setDate((prev) => ({ ...prev, month: Number(e.target.value) }));
            if (errors["date.month"]) {
              setErrors((prev) => ({ ...prev, "date.month": "" }));
            }
          }}
          error={errors["date.month"]}
        />

        <Input
          label="سنة الاستشهاد"
          placeholder="مثال: 2023"
          type="number"
          className="focus:border-secondary w-full"
          required={false}
          value={date.year || ""}
          onChange={(e) => {
            setDate((prev) => ({ ...prev, year: Number(e.target.value) }));
            if (errors["date.year"]) {
              setErrors((prev) => ({ ...prev, "date.year": "" }));
            }
          }}
          error={errors["date.year"]}
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
