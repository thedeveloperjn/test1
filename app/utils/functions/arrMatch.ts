// match two array
export function arraysMatch(arr1: any[], arr2: any[]) {
  if (arr1?.length !== arr2?.length) {
    return false;
  }

  const titles1 = arr1?.map((item: string) => item?.toLowerCase());
  const titles2 = arr2?.map((item: string) => item?.toLowerCase());

  titles1.sort();
  titles2.sort();

  for (let i = 0; i < titles1?.length; i++) {
    if (titles1[i] !== titles2[i]) {
      return false;
    }
  }

  return true;
}
