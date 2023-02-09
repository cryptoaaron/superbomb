import { useEffect, useState } from "react";
import queryString from "query-string";

// interface IParams {
//   amount?: string;
//   hostAddress?: string;
//   meetingId?: string;
//   redirectUrl?: string;
//   userId?: string;
//   allow?: boolean;
// }

export const useParams = () => {
  const [params, setParams] = useState({
    pool: undefined,
    referrer: undefined,
  });

  useEffect(() => {
    let addrs = window.location.pathname.split("/");

    if (addrs.length > 1) {
      const queryParams = {
        pool: addrs[1],
        referrer: addrs.length > 2 ? addrs[2] : undefined,
      };
      if (queryParams) {
        if (queryParams?.referrer) {
          if (!/^0x[0-9a-f]{40}$/.test(queryParams?.referrer.toLowerCase())) {
            delete queryParams.referrer;
            window.location.href = `/${queryParams?.pool}`;
          }
          if (!/^0x[0-9a-f]{40}$/.test(queryParams?.pool.toLowerCase())) {
            delete queryParams.pool;
            window.location.href = "/";
          }
        }
        setParams(queryParams);
      }
    }
  }, []);

  return {
    ...params,
    allow: params?.pool && params?.referrer,
  };
};
