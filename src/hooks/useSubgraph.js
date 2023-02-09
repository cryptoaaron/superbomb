import { log } from "../utils/logs";

const endpoint = "https://api.thegraph.com/subgraphs/name/rafaqat12/vft-pool";

const query = `
{
  pools(first: 1000) {
    id
    fee
    apr
    stakeToken {
      symbol
    }
    rewardToken{
      symbol
    }
  }
}
`;

export const useSubgraph = () => {
  const fetchPools = async () => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      const resJSON = await res.json();
      const { data } = resJSON || {};
      if (data) {
        const { pools } = data;
        return pools;
      }
      return [];
    } catch (e) {
      log("fetching", e);
      return [];
    }
  };

  return { fetchPools };
};
