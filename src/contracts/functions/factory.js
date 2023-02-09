import { log } from "../../utils/logs";
import { toWei } from "../../utils/helpers";
import { sendTx } from "../../utils/sendTx";
import { factoryContract } from "../getContracts";

export const instantiate = async (
  _rewardToken,
  _stakeToken,
  _poolMaxParticipants,
  _minimumStakeValue,
  _ROI,
  account,
  cb = () => {}
) => {
  try {
    const value = toWei("0.5");
    let contract = factoryContract();
    await sendTx(
      account,
      contract?.methods.instantiate(
        _rewardToken,
        _stakeToken,
        _poolMaxParticipants,
        _minimumStakeValue,
        _ROI
      ),
      cb,
      value
    );
  } catch (e) {
    log("instantiate", e);
  }
};
