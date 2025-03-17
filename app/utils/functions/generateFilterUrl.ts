import { FilterProps } from "@/interfaces/filter/filter";

export const generateFilterUrl = (filterData: FilterProps[]) => {
    if (!filterData || !Array.isArray(filterData)) return '';

    return filterData
        .map((filter) => {
            if (!filter.type || filter.value === null) return '';

            let { type, value } = filter;

            // Normalize type: remove spaces, underscores, and hyphens, then convert to lowercase
            type = type.replace(/[_\-\s]/g, '').toLowerCase();
            if (value === 'all') return '';
            // Ignore if the type is 'category'
            if (type === 'category') return '';

            if (type === 'pricerange' && typeof value === 'string') {
                const [minPrice, maxPrice] = value.split('-');
                return `minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`;
            }
            if (type === 'color' && Array.isArray(value)) {
                // 
                const v2 = value.map((v) => {
                    const [colorName, colorCode] = (v as string).split('-#');
                    return colorCode
                })
                return `color=${encodeURIComponent(v2.join(','))}`;
            }
            const valueString = Array.isArray(value)
                ? value.join(',')
                : value;

            return valueString ? `${type}=${encodeURIComponent(valueString)}` : '';
        })
        .filter(Boolean) // Remove empty strings
        .join('&');
};