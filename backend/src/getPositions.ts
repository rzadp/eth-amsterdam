import { Position, PositionWithRequirement } from "types/Position";
import { getMarginRequirement } from "./getMarginRequirement";
import { fetchPositions } from "./fetchGraphPositions";

export async function getPositions() {
  let positions: PositionWithRequirement[] = [];

  const graphPositions = await fetchPositions();

  for (const graphqlPosition of graphPositions) {
    const position: Position = {
      owner: graphqlPosition.owner.id,
      tickLower: graphqlPosition.tickLower.value,
      tickUpper: graphqlPosition.tickUpper.value,
      margin: graphqlPosition.margin,
      marginEngineAddress: graphqlPosition.amm.marginEngineAddress,
    };
    const marginRequirement = await getMarginRequirement(position);

    positions.push({ ...position, marginRequirement });
  }
  return positions;
}
