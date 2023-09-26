import { products } from "@prisma/client";
import { QueryOptionsType } from "@/types/dataTypes";
import useSWRInfinite from "swr/infinite";
import { fetcher, formatPaginatedEndpoint } from "@/lib/serverUtils";
import { SWR_RETRY_COUNT } from "@/types/constants";
export const useProducts = (
  enabled: boolean,
  baseUrl: string | undefined,
  options?: QueryOptionsType,
  initialData?: products[][]
) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!enabled || !baseUrl) return null; // skip
    if (previousPageData && !previousPageData.length) return null; // reached the end
    if (
      previousPageData &&
      previousPageData.length % (options?.limit || 0) !== 0
    )
      return null; // reached the end
    const { ...queryParams } = options || {};
    let offset = pageIndex * (options?.limit ?? 0);

    return formatPaginatedEndpoint(baseUrl, queryParams, offset); // SWR key
  };

  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<products[]>(getKey, fetcher, {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= SWR_RETRY_COUNT) return;
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
      fallbackData: initialData,
    });

  //format the data into Product[]
  let formattedProducts: products[] = [];

  data?.forEach((page) => {
    if (!page) return;
    if (page.length > 0) {
      page.forEach((product) => {
        formattedProducts.push(product);
      });
    }
  });

  return {
    data: formattedProducts,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  };
};
