"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const Search = ({
  placeholder = "Search Title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let newUrl = "";
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="flex-center bg-grey-50 min-h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 bg-grey-50 placeholder:text-grey-500 border-0 shadow-none outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
