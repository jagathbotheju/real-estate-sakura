"use client";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import _ from "lodash";
import { Button } from "./ui/button";

interface Props {
  totalPages: number;
  currentPage: number;
  route?: string;
}

const PaginationContainer = ({
  totalPages,
  currentPage,
  route = "/",
}: Props) => {
  const router = useRouter();
  if (totalPages === 1) return null;

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {_(totalPages).times((page) => {
          return (
            <PaginationItem key={page}>
              <Button
                variant={currentPage - 1 === page ? "default" : "outline"}
                onClick={() => {
                  return router.push(`${route}?page_num=${page}`);
                }}
              >
                {++page}
              </Button>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationContainer;
