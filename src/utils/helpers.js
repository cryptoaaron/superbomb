import Web3 from "web3";

export const trunc = (
  _ = "0x0000000000000000000000000000000000000000",
  start = 6,
  end = 4
) =>
  _ ? _.slice(0, start) + ".." + _.slice(_.length - end, _.length) : "0x..00";

export const toEther = (num) => {
  try {
    return Web3.utils.fromWei(num, "ether");
  } catch {
    return "0";
  }
};

export const toWei = (num) => {
  try {
    return Web3.utils.toWei(num, "ether");
  } catch {
    return "0";
  }
};
