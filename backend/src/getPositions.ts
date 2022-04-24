import { Position } from "types/Position";
import { getMarginRequirement } from "./getMarginRequirement";
import { fetchPositions } from "./fetchGraphPositions";
import { addStats } from "./addStats";
import { PositionsStore } from "./PositionsStore";

let inProgress = false;

export async function getPositions(positionsStore: PositionsStore) {
  if (inProgress) return;
  inProgress = true;
  const graphPositions = await fetchPositions();

  for (const graphqlPosition of graphPositions) {
    const position: Position = {
      id: graphqlPosition.id,
      owner: graphqlPosition.owner.id,
      tickLower: graphqlPosition.tickLower.value,
      tickUpper: graphqlPosition.tickUpper.value,
      margin: graphqlPosition.margin,
      marginEngineAddress: graphqlPosition.amm.marginEngineAddress,
    };
    const marginRequirement = await getMarginRequirement(position);

    positionsStore.addOrUpdatePosition(
      addStats({ ...position, marginRequirement })
    );
  }

  inProgress = false;
}
