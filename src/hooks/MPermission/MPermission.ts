import { useInfiniteQuery } from "@tanstack/react-query";
import { permissionApi } from "services/MPermissionApi/MPermissionApi";

const queryKey = "MPermissionRoles";

export const usePermissionRolesInfiniteQuery = (search?: string) => {
  const query = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await permissionApi.permissionRole({
        page: pageParam,
        search,
      });
      return response.status === 200 ? response.data : [];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length;
    },
    select: (data) => {
      return data.pages.flat();
    },
    refetchOnWindowFocus: true,
    retry: 2,
    staleTime: 0,
    gcTime: 0,
    retryOnMount: true,
  });

  return { ...query };
};
