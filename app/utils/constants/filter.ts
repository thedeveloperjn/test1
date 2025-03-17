import { FilterSliceProps } from "../../interfaces/filter/filter";

export const WEAVING_PATTERN = [
    { name: "Korvai", slug: "KORVAI" },
    { name: "Petni", slug: "PETNI" },
    { name: "Kol Weaving (Ettukol)", slug: "KOL_WEAVING" },
];

export const ZARI = [
    { name: "Without Zari", slug: "WITHOUT_ZARI" },
    { name: "Heavy Zari", slug: "HEAVY_ZARI" },
    { name: "Medium Zari", slug: "MEDIUM_ZARI" },
    { name: "Copper / Silver Zari", slug: "COPPER_SILVER_ZARI" },
    { name: "Pure Gold Zari", slug: "PURE_GOLD_ZARI" },
];

export const FILTER_INITIAL_STATE: FilterSliceProps = {
    filters: [],
    sortBy: null,
    isLoading: {
        state: false,
        id: ""
    },
    error: undefined
}