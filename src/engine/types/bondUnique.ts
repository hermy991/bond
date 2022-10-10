import { TBondEntityRef } from "./bondEntity.ts";

export type TBondPartialUniqueValue = {
  uniqueName: string;
  columns: string[];
};

export type TBondUniqueValue =
  & TBondPartialUniqueValue
  & TBondEntityRef;
