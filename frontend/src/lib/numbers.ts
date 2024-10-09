import { Unit } from "@/lib/interfaces/Ingredient";

export function round(value: number, decimals: number) {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}

type Magnitude = {
  unit: Unit;
  value: number;
};

const UNIT_CONVERSIONS: Record<string, Record<string, number>> = {
  KG: {
    G: 1000,
  },
  G: {
    KG: 0.001,
  },
  L: {
    ML: 1000,
  },
  ML: {
    L: 0.001,
  },
}

export function convertMagnitude(magnitude: Magnitude, newUnit: Unit) {
  if (magnitude.unit === newUnit) {
    return magnitude.value;
  }
  const conversionFactor = UNIT_CONVERSIONS[magnitude.unit]?.[newUnit];
  if (conversionFactor !== undefined) {
    return magnitude.value * conversionFactor;
  }
  return magnitude.value;
}