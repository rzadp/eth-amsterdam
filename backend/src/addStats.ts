import { PositionStats, PositionWithRequirement } from "types/Position";

export function addStats(position: PositionWithRequirement): PositionStats {
  const isLiquiditable = position.margin < position.marginRequirement;

  const marginAbs = Math.abs(position.margin - position.marginRequirement);
  const marginRel = marginAbs / position.marginRequirement;

  return { ...position, isLiquiditable, marginAbs, marginRel };
}
