import { VariantData } from "@/interfaces/product/product";

// Function to compare two objects deeply
const deepCompareObjects = (obj1: VariantData, obj2: VariantData): boolean => {
  const obj1Keys = Object.keys(obj1) as Array<keyof VariantData>;
  const obj2Keys = Object.keys(obj2) as Array<keyof VariantData>;

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (const key of obj1Keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects &&
        !deepCompareObjects(val1 as VariantData, val2 as VariantData)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};

// Helper function to check if a value is an object
const isObject = (object: unknown): object is object => {
  return object !== null && typeof object === "object";
};

// Function to compare two arrays
export const isVariantMatch = (
  array1: VariantData[],
  array2: VariantData[]
): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (!deepCompareObjects(array1[i], array2[i])) {
      return false;
    }
  }

  return true;
};
