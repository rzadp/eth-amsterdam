export type Position = {
  owner: string;
  tickLower: number;
  tickUpper: number;
  margin: number;
  marginEngineAddress: string;
};

export interface PositionWithRequirement extends Position {
  marginRequirement: number;
}
