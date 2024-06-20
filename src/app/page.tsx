import PaginationContainer from "@/components/PaginationContainer";
import PropertyCards from "@/components/PropertyCards";
import Search from "@/components/Search";
import prisma from "@/lib/prisma";
import { PropertyExt } from "@/types";

const PAGE_SIZE = 4;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const page_num = searchParams.page_num ?? 0;
  const query = searchParams.query ?? "";

  const propertiesPromise = prisma.property.findMany({
    include: {
      contact: true,
      images: true,
      propertyFeature: true,
      propertyLocation: true,
      propertyStatus: true,
      propertyType: true,
    },
    ...(!!query && {
      where: {
        name: {
          contains: String(query),
        },
      },
    }),
    skip: page_num === 0 ? 0 : (+page_num - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  const totalPropertiesPromise = prisma.property.count({
    ...(!!query && {
      where: {
        name: {
          contains: String(query),
        },
      },
    }),
  });

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);
  const totalPages = Math.ceil(totalProperties / PAGE_SIZE);

  return (
    <div className="flex w-full flex-col gap-5">
      <Search />
      <PropertyCards properties={properties as PropertyExt[]} />
      <PaginationContainer totalPages={totalPages} currentPage={+page_num} />
    </div>
  );
}
