"use client";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import Input from "./Input";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");
  const debouncevalue = useDebounce<string>(value);
  const router = useRouter();
  useEffect(() => {
    const query = {
      title: debouncevalue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncevalue, router]);
  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
