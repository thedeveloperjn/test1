export const getDiscountPercentage = (
  sellingPrice = 0,
  mrp = 0,

  label = 'OFF'
) => {
  const commonMrp = Number(mrp)
  const perProductPrice = Number(sellingPrice)

  if (
    isNaN(commonMrp) ||
    isNaN(perProductPrice)
    ||
    commonMrp <= 0 ||
    perProductPrice <= 0
  ) {
    return null // Return 'N/A' if input values are not valid.
  }
  const discount = mrp - sellingPrice
  const percentage = Math.round((discount / commonMrp) * 100)
  //   const percentage = Math.round(
  //     ((perProductPrice - commonMrp) / commonMrp) * 100
  //   )
  return `${percentage}% ${label}`
}
export const getDiscountPrice = (
  sellingPrice: number,
  mrp: number,

  label = 'OFF'
) => {
  const commonMrp = Number(mrp)
  const perProductPrice = Number(sellingPrice)

  if (
    isNaN(commonMrp) ||
    isNaN(perProductPrice) ||
    commonMrp <= 0 ||
    perProductPrice <= 0
  ) {
    return '' // Return 'N/A' if input values are not valid.
  }
  const discountPrice = mrp - sellingPrice

  //   const percentage = Math.round(
  //     ((perProductPrice - commonMrp) / commonMrp) * 100
  //   )
  return discountPrice
}

export const formatCurrency = (number = 0, fractionDigits = 0) => {
  if (isNaN(parseInt(number.toString()))) {
    return null
  }
  return parseInt(number.toString())?.toLocaleString('en-IN', {
    maximumFractionDigits: fractionDigits
  })
}

// Currency Formatter Function
export const formatCurrencyWithLabel = (value: number): string => {
  if (value >= 1_00_00_000) {
    return `₹${(value / 1_00_00_000).toFixed(1)} Cr`;
  } else if (value >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(1)} L`;
  } else if (value >= 1_000) {
    // return `₹${(value / 1_000).toFixed(1)} K`;
    return `₹${(value)}`
  }
  return `₹${formatCurrency(value.toFixed(2) as unknown as number)}`;
};