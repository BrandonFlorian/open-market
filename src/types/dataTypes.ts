import { Prisma } from "@prisma/client";

export type QueryOptionsType = {
  searchTerm?: string;
  pageSize?: number;
  limit?: number;
  order?: "price" | "createdAt";
  sort?: "asc" | "desc";
  query?: string;
  lang?: string;
};

export type OrderWithItemsAndProducts = Prisma.ordersGetPayload<{
  include: {
    order_items: {
      include: {
        products: true;
      };
    };
  };
}>;
