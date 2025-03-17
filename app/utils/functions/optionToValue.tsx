import {
  RowVariantDataOption,
  VariantData,
} from "@/interfaces/product/product";

export function convertArrayToOption(
  inputArray: VariantData[]
): RowVariantDataOption[] {
  return inputArray.map((item) => {
    const { value, ...rest } = item;
    return { ...rest, option: value };
  });
}

export function convertArrayToValue(
  outputArray: RowVariantDataOption[]
): VariantData[] {
  return outputArray.map((item) => {
    const { option, ...rest } = item;
    return { ...rest, value: option };
  });
}
