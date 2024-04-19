"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { PaginationProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? page + 1 : page - 1;
    let newUrl = "";
    if (pageValue > 1) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: urlParamName || "page",
        value: pageValue.toString(),
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [urlParamName || "page"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="flex gap-2">
          <Button
            size="lg"
            variant="outline"
            className="w-28"
            onClick={() => onClick("prev")}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-28"
            onClick={() => onClick("next")}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default Pagination;
