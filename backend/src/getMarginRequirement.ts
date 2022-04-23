import { utils, providers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import MarginEngine from "../../voltz-core/deployments/kovan/MarginEngine.json";

const marginEngineInterface = new utils.Interface(MarginEngine.abi);

export const getMarginRequirement = async (position: any): Promise<number> => {
  const contract = new Contract(
    position.marginEngineAddress,
    marginEngineInterface,
    new providers.JsonRpcProvider(
      "https://kovan.infura.io/v3/007740c0a57f4c7199135b074abf0e07"
    )
  );
  const marginRequirement =
    await contract.callStatic.getPositionMarginRequirement(
      position.owner,
      position.tickLower,
      position.tickUpper,
      false // _isLM
    );

  console.log(
    `Fetched marginRequirement: ${marginRequirement} for ${position}`
  );

  return marginRequirement.toNumber();
};
