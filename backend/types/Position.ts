export type Position = {
  id: string;
  owner: string;
  tickLower: number;
  tickUpper: number;
  margin: number;
  marginEngineAddress: string;
};
export interface PositionWithRequirement extends Position {
  marginRequirement: number;
}
export interface PositionStats extends PositionWithRequirement {
  isLiquiditable: boolean;
  marginAbs: number;
  marginRel: number;
}
