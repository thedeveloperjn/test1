// Function to calculate the remaining value after pairing
function displayPairing(number, numberOfPair) {
  const remainder = number % numberOfPair
  const unpaired = remainder === 0 ? 0 : numberOfPair - remainder
  // //
  return unpaired
}
function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].title !== arr2[i].title || arr1[i].value !== arr2[i].value) {
      return false
    }
  }
  return true
}
// SORT DISCOUNT APPLICABLE PRODUCT
async function sortDiscountApplicableProduct(cart, discountDetails) {
  // const updatedCart = [...cart.sort((a, b) => (a.discountId === b.discountId ? 0 : a.discountId ? -1 : 1))];
  // Rearrange the array so that items with the same discountId are grouped together
  cart.sort((a, b) => {
    const discountIdA = a.discountId || ''
    const discountIdB = b.discountId || ''

    // Ensure discountIdA and discountIdB are strings
    const idA = String(discountIdA)
    const idB = String(discountIdB)

    if (idA === idB) {
      return 0
    } else if (idA === '') {
      return 1
    } else if (idB === '') {
      return -1
    } else {
      return idA.localeCompare(idB)
    }
  })
  const updatedCart = cart.map(item => ({ ...item }))
  const groupedByDiscountId = updatedCart.reduce((acc, item) => {
    if (!acc[item.discountId]) {
      acc[item.discountId] = []
    }
    acc[item.discountId].push(item)
    return acc
  }, {})
  //
  // Iterate over each discount detail object
  discountDetails.forEach(discount => {
    if (discount.discountType === 'buyXgetY') {
      if (discount?.customerBuy === 'MINIMUM_QTY_ITEM') {
        const getQuantity = discount?.getQuantity
        const buyQuantity = discount?.minimumBuyQuantity
        const discountTitle = discount?.discountTitle

        const filteredGroupedByDiscountId = Object.fromEntries(
          Object.entries(groupedByDiscountId).filter(
            ([key, value]) => key === String(discount._id)
          )
        )
        // //
        // Iterate over the grouped items and set the isPair
        //
        Object.values(filteredGroupedByDiscountId).forEach(group => {
          //
          // If the discountId is blank, set isPair to blank
          if (group[0].discountId === '') {
            group.forEach(item => {
              item.isPair = ''
              item.offerStatus = ''
            })
          } else {
            // If discountId is not blank, set isPair based on pairing logic
            if (discount && discount.selectedBuyProducts.length > 0) {
              if (discount && discount.selectedGetCategories.length > 0) {
                const pairedItems = []
                group.forEach((item, index) => {
                  const otherItems = group.filter(
                    (otherItem, otherIndex) => otherIndex !== index
                  )
                  const hasSameDiscountId = otherItems.some(
                    otherItem => otherItem.discountId === item.discountId
                  )
                  const totalQuantity1 = cart
                    .filter(item1 => item1.discountId === item.discountId)
                    .reduce((total, item) => total + item.quantity, 0)
                  const totalQuantity = cart.reduce((acc, item) => {
                    const categoryIdsArray = item.categoryIds.split(',') // Split the categoryIds string into an array
                    const isMatchingCategory = categoryIdsArray.some(
                      categoryId =>
                        discount.selectedGetCategories.some(
                          category => category._id === categoryId.trim()
                        )
                    )
                    return isMatchingCategory ? acc + item.quantity : acc
                  }, 0)
                  const totalCartProduct = getQuantity

                  const pairedItems1 = cart.filter(
                    i => i.discountId === item.discountId
                  )
                  const isCategoryIdSelected = item.categoryIds
                    .split(',')
                    .some(id =>
                      discount.selectedGetCategories.some(
                        category => category._id === id
                      )
                    )
                  const totalCartProduct1 = buyQuantity + getQuantity
                  const totalQuantityPair =
                    totalQuantity1 % totalCartProduct1 === 0
                  const buyQty = totalQuantity1 - totalQuantity
                  //
                  //
                  // if (otherItems) {
                  // if (item?.isGiftedItem) {
                  if (
                    isCategoryIdSelected &&
                    (buyQty === totalQuantity || totalQuantityPair)
                  ) {
                    // if (totalQuantityPair) {
                    if (isCategoryIdSelected) {
                      item.isPair = 'PAIRED'
                      item.isFree = true
                      pairedItems.push(item)
                    } else {
                      item.isPair = 'PAIRED'
                      pairedItems.push(item)
                    }
                  } else {
                    const remainingValue = displayPairing(
                      totalQuantity1,
                      totalCartProduct1
                    )
                    item.offerStatus = `Add ${remainingValue} More item to apply offer (${discountTitle})`
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              } else {
                const pairedItems = []
                group.forEach((item, index) => {
                  const otherItems = group.filter(
                    (otherItem, otherIndex) => otherIndex !== index
                  )
                  const hasSameDiscountId = otherItems.some(
                    otherItem => otherItem.discountId === item.discountId
                  )
                  const totalQuantity = cart
                    .filter(item1 => item1.discountId === item.discountId)
                    .reduce((total, item) => total + item.quantity, 0)
                  const totalCartProduct = getQuantity
                  const totalQuantityPair =
                    totalQuantity % totalCartProduct === 0
                  const pairedItems1 = cart.filter(
                    i => i.discountId === item.discountId
                  )
                  const maxPrice = Math.max(
                    ...pairedItems1.map(
                      i => i.quantity * parseFloat(i.rows.mrp)
                    )
                  )
                  const minPrice = Math.min(
                    ...pairedItems1.map(
                      i => i.quantity * parseFloat(i.rows.mrp)
                    )
                  )
                  const highQty = Math.max(...pairedItems1.map(i => i.quantity))
                  const totQty = item.quantity * parseFloat(item.rows.mrp)
                  // if (otherItems) {
                  if (item?.isGiftedItem) {
                    item.isPair = 'PAIRED'
                    pairedItems.push(item)
                  } else {
                    const remainingValue = displayPairing(
                      totalQuantity,
                      totalCartProduct
                    )
                    item.offerStatus = `Add ${remainingValue} More item to apply offer (${discountTitle})`
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            } else {
              const pairedItems = []
              group.forEach((item, index) => {
                const otherItems = group.filter(
                  (otherItem, otherIndex) => otherIndex !== index
                )
                const hasSameDiscountId = otherItems.some(
                  otherItem => otherItem.discountId === item.discountId
                )
                const totalQuantity = cart
                  .filter(item1 => item1.discountId === item.discountId)
                  .reduce((total, item) => total + item.quantity, 0)
                const totalCartProduct = buyQuantity + getQuantity
                const totalQuantityPair = totalQuantity % totalCartProduct === 0
                const pairedItems1 = cart.filter(
                  i => i.discountId === item.discountId
                )
                const maxPrice = Math.max(
                  ...pairedItems1.map(i => i.quantity * parseFloat(i.rows.mrp))
                )
                const minPrice = Math.min(
                  ...pairedItems1.map(i => i.quantity * parseFloat(i.rows.mrp))
                )
                const highQty = Math.max(...pairedItems1.map(i => i.quantity))
                const totQty = item.quantity * parseFloat(item.rows.mrp)
                // //  || item.quantity !== highQty) ,"&&", (item.quantity !== highQty || item.quantity===1), "&&", (totalQuantity === totalCartProduct || hasSameDiscountId), "or", totalQuantityPair)
                // //
                // //
                //
                //
                //
                const discountData = item.applicableDiscounts
                const highestDiscounted = item.discountDetails
                const applicableDiscounts = discountData
                  .filter(discountObj => {
                    return (
                      !highestDiscounted ||
                      (discountObj._id.toString() !==
                        highestDiscounted._id.toString() &&
                        ((discount?.getQuantity >=
                          highestDiscounted?.getQuantity &&
                          discount?.finalDiscountAmoun >=
                            highestDiscounted?.finalDiscountAmoun &&
                          discount?.discountType === 'buyXgetY') ||
                          (discount?.minimumPurchaseQuantity >=
                            highestDiscounted?.minimumPurchaseQuantity &&
                            discount?.finalDiscountAmoun >=
                              highestDiscounted?.finalDiscountAmoun &&
                            discount?.discountType === 'amountOffProduct')))
                    )
                  })
                  .map(discountObj => {
                    const totalPQuantity = cart.reduce(
                      (sum, item) =>
                        sum +
                        item.applicableDiscounts?.filter(
                          discount =>
                            discount._id.toString() ===
                            discountObj._id.toString()
                        ).length *
                          item.quantity,
                      0
                    )
                    let minQty = discountObj?.minimumPurchaseQuantity
                    if (discountObj?.discountType === 'buyXgetY') {
                      minQty = discountObj?.minimumBuyQuantity
                    }
                    const remainingValue = displayPairing(
                      totalPQuantity,
                      minQty
                    )
                    //
                    return {
                      ...discountObj,
                      discountTitle:
                        remainingValue > 0
                          ? `Add ${remainingValue} More item to apply offer (${discountObj?.discountTitle})`
                          : ''
                    }
                  })
                //
                if (
                  ((totQty === maxPrice ||
                    totQty === minPrice ||
                    item.quantity !== highQty) &&
                    (item.quantity !== highQty || item.quantity === 1) &&
                    (totalQuantity === totalCartProduct ||
                      (hasSameDiscountId && buyQuantity === 1))) ||
                  totalQuantityPair ||
                  item?.isGiftedItem
                ) {
                  item.isPair = 'PAIRED'
                  pairedItems.push(item)
                  item.applicableDiscounts = applicableDiscounts
                } else {
                  const remainingValue = displayPairing(
                    totalQuantity,
                    totalCartProduct
                  )
                  item.offerStatus = `Add ${remainingValue} More item to apply offer (${discountTitle})`
                  item.isPair = 'NOT_PAIRED'
                  item.applicableDiscounts = applicableDiscounts
                }
              })
            }
          }
        })
      } else if (discount?.customerBuy === 'MINIMUM_PURCHASE_AMOUNT') {
        // //
        const getQuantity = discount?.getQuantity
        const purchaseAmount = discount?.minimumBuyPurchaseAmt
        const discountTitle = discount?.discountTitle
        // //
        const filteredGroupedByDiscountId = Object.fromEntries(
          Object.entries(groupedByDiscountId).filter(
            ([key, value]) => key === String(discount._id)
          )
        )
        Object.values(filteredGroupedByDiscountId).forEach(group => {
          // If the discountId is blank, set isPair to blank
          if (group[0].discountId === '') {
            group.forEach(item => {
              item.isPair = ''
              item.offerStatus = ''
            })
          } else {
            // If discountId is not blank, set isPair based on pairing logic
            if (discount && discount.selectedBuyProducts.length > 0) {
              const pairedItems = []
              group.forEach((item, index) => {
                const otherItems = group.filter(
                  (otherItem, otherIndex) => otherIndex !== index
                )
                const hasSameDiscountId = otherItems.some(
                  otherItem => otherItem.discountId === item.discountId
                )
                const totalQuantity = cart
                  .filter(item1 => item1.discountId === item.discountId)
                  .reduce((total, item) => total + item.quantity, 0)
                const totalCartProduct = 1 + getQuantity
                const totalQuantityPair = totalQuantity % totalCartProduct === 0
                const pairedItems1 = cart.filter(
                  i => i.discountId === item.discountId
                )
                const maxPrice = Math.max(
                  ...pairedItems1.map(i => i.quantity * parseFloat(i.rows.mrp))
                )
                const minPrice = Math.min(
                  ...pairedItems1.map(i => i.quantity * parseFloat(i.rows.mrp))
                )
                const highQty = Math.max(...pairedItems1.map(i => i.quantity))
                const totQty = item.quantity * parseFloat(item.rows.mrp)
                // //
                // if (otherItems) {
                if (
                  (parseFloat(item.rows.mrp) >=
                    discount.minimumBuyPurchaseAmt ||
                    item?.isGiftedItem) &&
                  totalQuantityPair
                ) {
                  item.isPair = 'PAIRED'
                  pairedItems.push(item)
                } else {
                  const remainingValue = displayPairing(
                    totalQuantity,
                    totalCartProduct
                  )
                  // item.offerStatus = `Add ${remainingValue} More item to apply offer (${discountTitle})`;
                  item.isPair = 'NOT_PAIRED'
                }
              })
            } else {
              const pairedItems = []
              group.forEach((item, index) => {
                const otherItems = group.filter(
                  (otherItem, otherIndex) => otherIndex !== index
                )
                const hasSameDiscountId = otherItems.some(
                  otherItem => otherItem.discountId === item.discountId
                )
                const totalQuantity = cart
                  .filter(item1 => item1.discountId === item.discountId)
                  .reduce((total, item) => total + item.quantity, 0)
                const totalAmount = cart
                  .filter(item1 => item1.discountId === item.discountId)
                  .reduce((total, item) => total + parseFloat(item.rows.mrp), 0)
                const minimumBuyPurchaseAmt = discount?.minimumBuyPurchaseAmt
                const totalProductQuantity = getQuantity
                const pairedItems1 = cart.filter(
                  i => i.discountId === item.discountId
                )
                // const highQty = Math.max(...pairedItems1.map(item => item.quantity));
                const highQty = pairedItems1.reduce(
                  (total, item) => total + item.quantity,
                  0
                )
                const totalPrice = pairedItems1.reduce(
                  (total, item) =>
                    total + item.quantity * parseFloat(item.rows.mrp),
                  0
                )
                // //
                // if (totalPrice>=minimumBuyPurchaseAmt && highQty>totalProductQuantity) {
                if (totalPrice >= minimumBuyPurchaseAmt) {
                  item.isPair = 'PAIRED'
                  pairedItems.push(item)
                } else {
                  item.isPair = 'NOT_PAIRED'
                }
              })
            }
          }
        })
      }
    } else if (discount.discountType === 'amountOffProduct') {
      const filteredGroupedByDiscountId = Object.fromEntries(
        Object.entries(groupedByDiscountId).filter(
          ([key, value]) => key === String(discount._id)
        )
      )
      if (discount && discount?.selectedAppliesCategories?.length > 0) {
        if (discount?.discountValueType === 'PERCENTAGE') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            // Iterate over the grouped items and set the isPair value
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  item.isPair = 'PAIRED'
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          discount?.selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )

                  const discountData = item?.applicableDiscounts
                  const highestDiscounted = item?.discountDetails
                  const applicableDiscounts = discountData
                    ?.filter(discountObj => {
                      return (
                        !highestDiscounted ||
                        (discountObj._id.toString() !==
                          highestDiscounted._id.toString() &&
                          ((discount?.getQuantity >=
                            highestDiscounted?.getQuantity &&
                            discount?.finalDiscountAmoun >=
                              highestDiscounted?.finalDiscountAmoun &&
                            discount?.discountType === 'buyXgetY') ||
                            (discount?.minimumPurchaseQuantity >=
                              highestDiscounted?.minimumPurchaseQuantity &&
                              discount?.finalDiscountAmoun >=
                                highestDiscounted?.finalDiscountAmoun &&
                              discount?.discountType === 'amountOffProduct')))
                      )
                    })
                    .map(discountObj => {
                      const totalPQuantity = cart.reduce(
                        (sum, item) =>
                          sum +
                          item.applicableDiscounts?.filter(
                            discount =>
                              discount._id.toString() ===
                              discountObj._id.toString()
                          ).length *
                            item.quantity,
                        0
                      )
                      let minQty = discountObj?.minimumPurchaseQuantity
                      if (discountObj?.discountType === 'buyXgetY') {
                        minQty = discountObj?.minimumBuyQuantity
                      }
                      const remainingValue = displayPairing(
                        totalPQuantity,
                        minQty
                      )
                      //
                      return {
                        ...discountObj,
                        discountTitle:
                          remainingValue > 0
                            ? `Add ${remainingValue} More item to apply offer (${discountObj?.discountTitle})`
                            : ''
                      }
                    })
                  const totalQuantity = cart
                    .filter(item1 => item1.discountId === item.discountId)
                    .reduce((total, item) => total + item.quantity, 0)
                  const totalCartProduct = discount?.minimumPurchaseQuantity
                  //
                  if (totalCount >= discount?.minimumPurchaseQuantity) {
                    item.isPair = 'PAIRED'
                    item.applicableDiscounts = applicableDiscounts
                  } else {
                    item.isPair = 'NOT_PAIRED'
                    item.applicableDiscounts = applicableDiscounts
                    const remainingValue = displayPairing(
                      totalQuantity,
                      totalCartProduct
                    )
                    item.offerStatus = `Add ${remainingValue} More item to apply offer (${discount?.discountTitle})`
                  }
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => discount?.selectedAppliesCategories.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          discount?.selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  if (totalPrice >= discount?.minimumPurchaseAmount) {
                    item.isPair = 'PAIRED'
                  } else {
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            })
          }
        } else if (discount?.discountValueType === 'FIXED_AMOUNT') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            // Iterate over the grouped items and set the isPair value
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  item.isPair = 'PAIRED'
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            //
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          discount?.selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  if (totalCount >= discount?.minimumPurchaseQuantity) {
                    item.isPair = 'PAIRED'
                  } else {
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => discount?.selectedAppliesCategories.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          discount?.selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  // //
                  if (totalPrice >= discount?.minimumPurchaseAmount) {
                    item.isPair = 'PAIRED'
                  } else {
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            })
          }
        }
      } else if (discount && discount?.selectedAppliesProducts) {
        if (discount?.discountValueType === 'PERCENTAGE') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            // Iterate over the grouped items and set the isPair value
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  item.isPair = 'PAIRED'
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  const selectedAppliesProducts =
                    discount?.selectedAppliesProducts

                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        compareArrays(
                          product.variantData,
                          cartItem.rows.variantData
                        )
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)

                  if (totalQuantity >= discount?.minimumPurchaseQuantity) {
                    item.isPair = 'PAIRED'
                  } else {
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  const selectedAppliesProducts =
                    discount?.selectedAppliesProducts
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id === cartItem._id &&
                        compareArrays(
                          product.variantData,
                          cartItem.rows.variantData
                        )
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)
                  if (totalPrice >= discount?.minimumPurchaseAmount) {
                    item.isPair = 'PAIRED'
                  } else {
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            })
          }
        } else if (discount?.discountValueType === 'FIXED_AMOUNT') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            // Iterate over the grouped items and set the isPair value
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  item.isPair = 'PAIRED'
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  const selectedAppliesProducts =
                    discount?.selectedAppliesProducts
                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        compareArrays(
                          product.variantData,
                          cartItem.rows.variantData
                        )
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const discountData = item?.applicableDiscounts
                  const highestDiscounted = item?.discountDetails
                  const applicableDiscounts = discountData
                    ?.filter(discountObj => {
                      return (
                        !highestDiscounted ||
                        (discountObj._id.toString() !==
                          highestDiscounted._id.toString() &&
                          ((discount?.getQuantity >=
                            highestDiscounted?.getQuantity &&
                            discount?.finalDiscountAmoun >=
                              highestDiscounted?.finalDiscountAmoun &&
                            discount?.discountType === 'buyXgetY') ||
                            (discount?.minimumPurchaseQuantity >=
                              highestDiscounted?.minimumPurchaseQuantity &&
                              discount?.finalDiscountAmoun >=
                                highestDiscounted?.finalDiscountAmoun &&
                              discount?.discountType === 'amountOffProduct')))
                      )
                    })
                    .map(discountObj => {
                      const totalPQuantity = cart.reduce(
                        (sum, item) =>
                          sum +
                          item.applicableDiscounts?.filter(
                            discount =>
                              discount._id.toString() ===
                              discountObj._id.toString()
                          ).length *
                            item.quantity,
                        0
                      )
                      let minQty = discountObj?.minimumPurchaseQuantity
                      if (discountObj?.discountType === 'buyXgetY') {
                        minQty = discountObj?.minimumBuyQuantity
                      }
                      const remainingValue = displayPairing(
                        totalPQuantity,
                        minQty
                      )
                      //
                      return {
                        ...discountObj,
                        discountTitle:
                          remainingValue > 0
                            ? `Add ${remainingValue} More item to apply offer (${discountObj?.discountTitle})`
                            : ''
                      }
                    })
                  const totalQuantity1 = cart
                    .filter(item1 => item1.discountId === item.discountId)
                    .reduce((total, item) => total + item.quantity, 0)
                  const totalCartProduct = discount?.minimumPurchaseQuantity
                  if (totalQuantity >= discount?.minimumPurchaseQuantity) {
                    item.isPair = 'PAIRED'
                    item.applicableDiscounts = applicableDiscounts
                  } else {
                    item.isPair = 'NOT_PAIRED'
                    item.applicableDiscounts = applicableDiscounts
                    const remainingValue = displayPairing(
                      totalQuantity1,
                      totalCartProduct
                    )
                    item.offerStatus = `Add ${remainingValue} More item to apply offer (${discount?.discountTitle})`
                  }
                })
              }
            })
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            Object.values(filteredGroupedByDiscountId).forEach(group => {
              // If the discountId is blank, set isPair to blank
              if (group[0].discountId === '') {
                group.forEach(item => {
                  item.isPair = ''
                  item.offerStatus = ''
                })
              } else {
                group.forEach((item, index) => {
                  const selectedAppliesProducts =
                    discount?.selectedAppliesProducts
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id === cartItem._id &&
                        compareArrays(
                          product.variantData,
                          cartItem.rows.variantData
                        )
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)
                  if (totalPrice >= discount?.minimumPurchaseAmount) {
                    item.isPair = 'PAIRED'
                  } else {
                    item.isPair = 'NOT_PAIRED'
                  }
                })
              }
            })
          }
        }
      }
    }
  })
  const rearrangedCart = updatedCart?.sort((a, b) =>
    a.isPair === 'NOT_PAIRED'
      ? -1
      : b.isPair === 'NOT_PAIRED'
        ? 1
        : a.isPair === 'PAIRED'
          ? -1
          : 1
  )

  return rearrangedCart || []
}
// Function to find the discountData object with the highest discount based on perProductPrice in the cart
function findHighestDiscount(
  discountDetails,
  item,
  totalPrice,
  discountData,
  totalCount
) {
  //
  //
  let highestDiscounted = null
  let highestDiscountValue = 0
  let matchingDiscountArray = []
  // cart.forEach((item, total) => {
  const perProductPrice = parseFloat(item.rows.mrp)
  const highestDiscountedObject = discountData.reduce(
    (highestDiscount, currentDiscount) => {
      // Check if any category in cart matches the discount's buy or apply categories
      const isApplicable = item.categoryIds.split(',').some(categoryId => {
        const isBuyCategoryMatch = currentDiscount.selectedBuyCategories.some(
          category => category._id === categoryId
        )
        const isApplyCategoryMatch =
          currentDiscount.selectedAppliesCategories.some(
            category => category._id === categoryId
          )
        const isApplyProductMatch =
          currentDiscount.selectedAppliesProducts.some(
            product =>
              product._id.toString() === item._id.toString() &&
              (item.rows.variantData.length > 0
                ? compareArrays(product.variantData, item.rows.variantData)
                : true)
          )
        const isBuyProductMatch = currentDiscount.selectedBuyProducts.some(
          product =>
            product._id.toString() === item._id.toString() &&
            (item.rows.variantData.length > 0
              ? compareArrays(product.variantData, item.rows.variantData)
              : true)
        )
        return (
          isBuyCategoryMatch ||
          isApplyCategoryMatch ||
          isApplyProductMatch ||
          isBuyProductMatch
        )
      })

      // If applicable and discount is higher than current highest, update highestDiscount
      if (isApplicable) {
        //
        if (currentDiscount.discountType === 'buyXgetY') {
          if (
            currentDiscount &&
            currentDiscount.selectedBuyCategories.length > 0
          ) {
            if (currentDiscount?.customerBuy === 'MINIMUM_QTY_ITEM') {
              const minQty =
                currentDiscount?.minimumBuyQuantity +
                currentDiscount?.getQuantity
              //
              if (totalCount >= minQty) {
                const numberOfSets = Math.floor(totalCount / minQty)
                const freeQty =
                  numberOfSets * parseInt(currentDiscount?.getQuantity)

                const totalMrp =
                  parseFloat(item?.quantity) * parseFloat(item.rows.mrp)
                const freeMrp = parseFloat(freeQty) * parseFloat(item.rows.mrp)
                // currentDiscount.finalDiscountAmount = (parseFloat(item?.quantity)*parseFloat(item.rows.mrp));
                currentDiscount.finalDiscountAmoun = freeMrp
                //
                matchingDiscountArray.push(currentDiscount)
              } else {
                const totalMrp =
                  parseFloat(item?.quantity) * parseFloat(item.rows.mrp)
                const freeMrp =
                  parseFloat(currentDiscount?.getQuantity) *
                  parseFloat(item.rows.mrp)
                // currentDiscount.finalDiscountAmount = (parseFloat(item?.quantity)*parseFloat(item.rows.mrp));
                currentDiscount.finalDiscountAmoun = freeMrp
                //
                matchingDiscountArray.push(currentDiscount)
              }
            }
          } else if (
            currentDiscount &&
            currentDiscount.selectedBuyProducts.length > 0
          ) {
            if (currentDiscount?.customerBuy === 'MINIMUM_QTY_ITEM') {
              const minQty =
                currentDiscount?.minimumBuyQuantity +
                currentDiscount?.getQuantity
              //
              if (totalCount >= minQty) {
                const totalMrp =
                  parseFloat(item?.quantity) * parseFloat(item.rows.mrp)
                const freeMrp =
                  parseFloat(currentDiscount?.getQuantity) *
                  parseFloat(item.rows.mrp)
                // currentDiscount.finalDiscountAmount = (parseFloat(item?.quantity)*parseFloat(item.rows.mrp));
                currentDiscount.finalDiscountAmoun = freeMrp
                //
                matchingDiscountArray.push(currentDiscount)
              }
            }
          }
        } else if (currentDiscount.discountType === 'amountOffProduct') {
          if (
            currentDiscount &&
            currentDiscount.selectedAppliesCategories.length > 0
          ) {
            if (currentDiscount?.discountValueType === 'PERCENTAGE') {
              if (
                currentDiscount?.minimumPurchaseRequirement ===
                'NO_MINIMUM_REQUIREMENT'
              ) {
                const discountAmount =
                  (parseFloat(currentDiscount.discountValuePercent) *
                    (parseFloat(item.rows.mrp) * parseInt(item.quantity))) /
                  100
                currentDiscount.finalDiscountAmount = discountAmount
                matchingDiscountArray.push(currentDiscount)
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_PURCHASE_AMOUNT'
              ) {
                if (totalPrice >= currentDiscount?.minimumPurchaseAmount) {
                  const discountAmount =
                    (parseFloat(currentDiscount.discountValuePercent) *
                      (parseFloat(item.rows.mrp) * parseInt(item.quantity))) /
                    100
                  currentDiscount.finalDiscountAmount = discountAmount
                  //
                  matchingDiscountArray.push(currentDiscount)
                }
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_QUANTITY_ITEMS'
              ) {
                //
                if (totalCount >= currentDiscount?.minimumPurchaseQuantity) {
                  const discountAmount =
                    (parseFloat(currentDiscount.discountValuePercent) *
                      (parseFloat(item.rows.mrp) * parseInt(item.quantity))) /
                    100
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                } else {
                  // const discountAmount = (parseFloat(currentDiscount.discountValuePercent) * ((parseFloat(item.rows.mrp)) * parseInt(item.quantity))) / 100;
                  // currentDiscount.finalDiscountAmount = discountAmount;
                  // matchingDiscountArray.push(currentDiscount);
                }
              }
            } else if (currentDiscount?.discountValueType === 'FIXED_AMOUNT') {
              if (
                currentDiscount?.minimumPurchaseRequirement ===
                'NO_MINIMUM_REQUIREMENT'
              ) {
                const discountAmount = currentDiscount.discountValueAmount
                currentDiscount.finalDiscountAmount = discountAmount
                matchingDiscountArray.push(currentDiscount)
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_PURCHASE_AMOUNT'
              ) {
                if (totalPrice >= currentDiscount?.minimumPurchaseAmount) {
                  const discountAmount = currentDiscount.discountValueAmount
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                }
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_QUANTITY_ITEMS'
              ) {
                if (totalCount >= currentDiscount?.minimumPurchaseQuantity) {
                  const discountAmount = currentDiscount.discountValueAmount
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                }
              }
            }
          } else if (
            currentDiscount &&
            currentDiscount.selectedAppliesProducts.length > 0
          ) {
            if (currentDiscount?.discountValueType === 'PERCENTAGE') {
              if (
                currentDiscount?.minimumPurchaseRequirement ===
                'NO_MINIMUM_REQUIREMENT'
              ) {
                const discountAmount =
                  (parseFloat(currentDiscount.discountValuePercent) *
                    (parseFloat(item.rows.mrp) * parseInt(item.quantity))) /
                  100
                currentDiscount.finalDiscountAmount = discountAmount
                matchingDiscountArray.push(currentDiscount)
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_QUANTITY_ITEMS'
              ) {
                if (totalCount >= currentDiscount?.minimumPurchaseQuantity) {
                  const discountAmount =
                    (parseFloat(currentDiscount.discountValuePercent) *
                      (parseFloat(item.rows.mrp) * parseInt(item.quantity))) /
                    100
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                }
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_PURCHASE_AMOUNT'
              ) {
                if (totalPrice >= currentDiscount?.minimumPurchaseAmount) {
                  const discountAmount =
                    (parseFloat(currentDiscount.discountValuePercent) *
                      (parseFloat(item.rows.mrp) * parseInt(item.quantity))) /
                    100
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                }
              }
            } else if (currentDiscount?.discountValueType === 'FIXED_AMOUNT') {
              if (
                currentDiscount?.minimumPurchaseRequirement ===
                'NO_MINIMUM_REQUIREMENT'
              ) {
                const discountAmount = currentDiscount.discountValueAmount
                currentDiscount.finalDiscountAmount = discountAmount
                matchingDiscountArray.push(currentDiscount)
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_QUANTITY_ITEMS'
              ) {
                if (totalCount >= currentDiscount?.minimumPurchaseQuantity) {
                  const discountAmount = currentDiscount.discountValueAmount
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                }
              } else if (
                currentDiscount?.minimumPurchaseRequirement ===
                'MINIMUM_PURCHASE_AMOUNT'
              ) {
                if (totalPrice >= currentDiscount?.minimumPurchaseAmount) {
                  const discountAmount = currentDiscount.discountValueAmount
                  currentDiscount.finalDiscountAmount = discountAmount
                  matchingDiscountArray.push(currentDiscount)
                }
              }
            }
          }
        }
      }
      // return highestDiscount;
    },
    null
  )
  //
  if (matchingDiscountArray && matchingDiscountArray?.length > 0) {
    // highestDiscounted = matchingDiscountArray.reduce((highest, current) =>
    //   current.finalDiscountAmount > highest.finalDiscountAmount ? current : highest
    // );
    highestDiscounted = matchingDiscountArray.reduce((maxObj, currentObj) =>
      maxObj.finalDiscountAmount > currentObj.finalDiscountAmount
        ? maxObj
        : currentObj
    )

    // matchingDiscountArray.reduce((objectWithHigherDiscount, currentDiscount) => {
    //   // Compare finalDiscountAmount values
    //   return objectWithHigherDiscount ? (objectWithHigherDiscount.finalDiscountAmount > currentDiscount.finalDiscountAmount ? objectWithHigherDiscount : currentDiscount) : currentDiscount;
    // }, null);
  }
  // const applicableDiscounts = discountData.filter(discount =>
  //   (item.categoryIds.split(',').some(catId =>
  //     discount.selectedAppliesCategories?.map(category => category._id).includes(catId) ||
  //     discount.selectedBuyCategories?.map(category => category._id).includes(catId)
  //   ) ||
  //   discount.selectedAppliesProducts.some(product =>
  //     product._id.toString() === item._id.toString()
  //     && (item.rows.variantData.length > 0 ? compareArrays(product.variantData, item.rows.variantData) : true)
  //   ))
  //   &&
  //   discount._id.toString()!==highestDiscounted?._id.toString()
  // );
  const applicableDiscounts = discountData?.filter(discount => {
    //
    // Check for category or product applicability
    const isApplicableByCategory =
      item.categoryIds
        .split(',')
        .some(
          catId =>
            discount.selectedAppliesCategories
              ?.map(category => category._id)
              .includes(catId) ||
            discount.selectedBuyCategories
              ?.map(category => category._id)
              .includes(catId)
        ) &&
      (highestDiscounted
        ? discount._id?.toString() !== highestDiscounted._id?.toString() &&
          (discount?.finalDiscountAmount >
            highestDiscounted?.finalDiscountAmount ||
            !discount?.finalDiscountAmount)
        : true)

    const isApplicableByProduct =
      discount.selectedAppliesProducts.some(
        product =>
          product._id.toString() === item._id.toString() &&
          (item.rows.variantData.length > 0
            ? compareArrays(product.variantData, item.rows.variantData)
            : true)
      ) &&
      (highestDiscounted
        ? discount._id?.toString() !== highestDiscounted._id?.toString() &&
          (discount?.finalDiscountAmount >
            highestDiscounted?.finalDiscountAmount ||
            !discount?.finalDiscountAmount)
        : true)

    const isBuyProduct =
      discount.selectedBuyProducts.some(
        product =>
          product._id.toString() === item._id.toString() &&
          (item.rows.variantData.length > 0
            ? compareArrays(product.variantData, item.rows.variantData)
            : true)
      ) &&
      (highestDiscounted
        ? discount._id?.toString() !== highestDiscounted._id?.toString() &&
          (discount?.finalDiscountAmount >
            highestDiscounted?.finalDiscountAmount ||
            !discount?.finalDiscountAmount)
        : true)
    // Apply discount if applicable and not the highest discounted (if defined)
    return isApplicableByCategory || isApplicableByProduct || isBuyProduct //&&
    // (!highestDiscounted || (discount._id.toString() !== highestDiscounted._id.toString()
    //  &&
    //  ((discount?.getQuantity>=highestDiscounted?.getQuantity && discount?.discountType==="buyXgetY") ||
    //   (discount?.getQuantity>=highestDiscounted?.getQuantity && discount?.discountType==="amountOffProduct") )
    // ));
  })
  //
  return {
    highestDiscount: highestDiscounted,
    matchingDiscountArray: applicableDiscounts
  }
}
// CHECK PRODUCT IS DISCOUNT APPLICABLE OR NOT
async function checkDiscountApplicable(cart, discountData) {
  //
  const discDataArr = discountData
  //
  // Loop through each item in the cart
  await Promise.all(
    discDataArr.map(async (discountDetails, index) => {
      if (discountDetails?.discountType === 'buyXgetY') {
        if (discountDetails?.customerBuy === 'MINIMUM_QTY_ITEM') {
          let productFreeCount = 0
          await Promise.all(
            cart.map(async (item, index) => {
              // if (!item.discountApplicable) {
              // item.discountApplicable = false;
              // item.discountTitle = "";
              // item.discountId = "";
              // item.discountDetails = null;
              const categoryIdsArray = item.categoryIds.split(',')
              let discountApplied = false // Flag to track if discount applied
              //
              if (
                discountDetails &&
                discountDetails.selectedBuyCategories.length > 0
              ) {
                if (
                  discountDetails &&
                  discountDetails.selectedGetProducts.length > 0
                ) {
                  if (
                    item?.quantity >= discountDetails?.minimumBuyQuantity &&
                    !discountApplied
                  ) {
                    const getProduct =
                      await productBuyXGetYfree(discountDetails)
                    cart.push(getProduct[0])
                    item.discountTitle = discountDetails.discountTitle
                    item.discountId = discountDetails._id
                    item.discountDetails = discountDetails
                    item.isGiftedItem = true
                    // item.applicableDiscounts = [discountDetails];
                    // discountApplied = true; // Set flag to true
                  } else {
                    item.discountTitle = discountDetails.discountTitle
                    item.discountId = discountDetails._id
                    item.discountDetails = discountDetails
                    item.applicableDiscounts = [discountDetails]
                  }
                } else {
                  const selectedBuyCategories =
                    discountDetails?.selectedBuyCategories
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedBuyCategories.map(cat => cat._id).includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  const pairedItems = cart.filter(
                    i => i.discountId === item.discountId
                  )
                  const totalPrice = pairedItems.reduce(
                    (total, item) =>
                      total + item.quantity * parseFloat(item.rows.mrp),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalCount
                  )

                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  //
                  discountDetails.selectedBuyCategories.forEach(category => {
                    if (categoryIdsArray.includes(category._id)) {
                      //
                      //
                      // if (totalCount >= highestDiscount?.minimumBuyQuantity) {
                      //
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                      item.discountDetails = highestDiscount
                      discountApplied = true // Set flag to true
                      item.applicableDiscounts = applicableDiscounts
                      // }
                    }
                  })
                }
              } else if (
                discountDetails &&
                discountDetails.selectedBuyProducts.length > 0
              ) {
                if (
                  discountDetails &&
                  discountDetails.selectedGetProducts.length > 0
                ) {
                  const parentProduct = discountData?.filter(
                    discount =>
                      discount.selectedBuyProducts.some(
                        product =>
                          product._id.toString() === item._id.toString()
                      ) &&
                      (item.rows.variantData
                        ? matchingArray(
                            discount.selectedBuyProducts.find(
                              product =>
                                product._id.toString() === item._id.toString()
                            ).variantData,
                            item.rows.variantData
                          )
                        : true)
                  )
                  if (
                    productFreeCount < discountDetails.getQuantity &&
                    parentProduct &&
                    parentProduct?.length > 0
                  ) {
                    const getProduct =
                      await productBuyXGetYfree(discountDetails)
                    cart.push(getProduct[0])
                    item.discountTitle = discountDetails.discountTitle
                    item.discountId = discountDetails._id
                    item.discountDetails = discountDetails
                    item.isGiftedItem = true
                    // item.applicableDiscounts = [discountDetails];
                  } else if (parentProduct && parentProduct?.length > 0) {
                    item.discountTitle = discountDetails.discountTitle
                    item.discountId = discountDetails._id
                    item.discountDetails = discountDetails
                    item.applicableDiscounts = [discountDetails]
                  }
                } else {
                  const selectedBuyProducts =
                    discountDetails?.selectedBuyProducts
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => selectedBuyProducts.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);
                  const totalCount = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedBuyProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        compareArrays(
                          product.variantData,
                          cartItem.rows.variantData
                        )
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const pairedItems = cart.filter(
                    i => i.discountId === item.discountId
                  )
                  const totalPrice = pairedItems.reduce(
                    (total, item) =>
                      total + item.quantity * parseFloat(item.rows.mrp),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalCount
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  // const isCategoryIdSelected = item.categoryIds.split(",").some(id => discountDetails.selectedGetCategories.some(category => category._id === id));
                  //
                  if (highestDiscount) {
                    productFreeCount++
                    item.discountApplicable = true
                    item.discountTitle = highestDiscount?.discountTitle
                    item.discountId = highestDiscount?._id
                    item.discountDetails = highestDiscount
                    // discountApplied = true; // Set flag to true
                    // item.applicableDiscounts = applicableDiscounts;
                    // item.isGiftedItem = true;
                    // item.isChiled = parentProduct && parentProduct?.length ? false : true
                  } else {
                    item.discountTitle = discountDetails.discountTitle
                    item.discountId = discountDetails._id
                    item.discountDetails = discountDetails
                    item.applicableDiscounts = applicableDiscounts
                  }
                  // const parentProduct = discountData.filter(discount => discount.selectedBuyProducts.some(product => product._id.toString() === item._id.toString())
                  //   && (item.rows.variantData ? matchingArray(discount.selectedBuyProducts.find(product => product._id.toString() === item._id.toString()).variantData, item.rows.variantData) : true));
                  // if (productFreeCount <= discountDetails.getQuantity) {
                  //   productFreeCount++;
                  //   item.discountApplicable = true;
                  //   item.discountTitle = discountDetails.discountTitle;
                  //   item.discountId = discountDetails._id;
                  //   item.discountDetails = discountDetails;
                  //   discountApplied = true; // Set flag to true
                  //   item.applicableDiscounts = [discountDetails];
                  //   // item.isGiftedItem = true;
                  //   // item.isChiled = parentProduct && parentProduct?.length ? false : true
                  // }
                }
              }
              // }
            })
          )
        } else if (discountDetails?.customerBuy === 'MINIMUM_PURCHASE_AMOUNT') {
          let productFreeCount = 0
          await Promise.all(
            cart.map(async (item, index) => {
              if (!item.discountApplicable) {
                item.discountApplicable = false
                item.discountTitle = ''
                item.discountId = ''
                item.discountDetails = null
                const categoryIdsArray = item.categoryIds.split(',')
                let discountApplied = false // Flag to track if discount applied
                if (
                  discountDetails &&
                  discountDetails.selectedBuyCategories.length > 0
                ) {
                  if (
                    discountDetails &&
                    discountDetails.selectedGetProducts.length > 0
                  ) {
                    const pairedItems = cart.filter(
                      i => i.discountId === item.discountId
                    )
                    const totalPrice = pairedItems.reduce(
                      (total, item) =>
                        total + item.quantity * parseFloat(item.rows.mrp),
                      0
                    )
                    if (totalPrice >= discountDetails?.minimumBuyPurchaseAmt) {
                      const getProduct =
                        await productBuyXGetYfree(discountDetails)
                      cart.push(getProduct[0])
                    }
                  } else {
                    discountDetails.selectedBuyCategories.forEach(category => {
                      // //
                      if (
                        categoryIdsArray.includes(category._id) &&
                        !discountApplied
                      ) {
                        item.discountApplicable = true
                        item.discountTitle = discountDetails.discountTitle
                        item.discountId = discountDetails._id
                        item.discountDetails = discountDetails
                        discountApplied = true // Set flag to true
                        item.applicableDiscounts = [discountDetails]
                      }
                    })
                  }
                } else if (
                  discountDetails &&
                  discountDetails.selectedBuyProducts.length > 0
                ) {
                  if (
                    discountDetails &&
                    discountDetails.selectedGetProducts.length > 0
                  ) {
                    const parentProduct = discountData?.filter(
                      discount =>
                        discount.selectedBuyProducts.some(
                          product =>
                            product._id.toString() === item._id.toString()
                        ) &&
                        (item.rows.variantData
                          ? matchingArray(
                              discount.selectedBuyProducts.find(
                                product =>
                                  product._id.toString() === item._id.toString()
                              ).variantData,
                              item.rows.variantData
                            )
                          : true)
                    )
                    if (
                      parseFloat(item.rows.mrp) >=
                        discountDetails.minimumBuyPurchaseAmt &&
                      parentProduct &&
                      parentProduct?.length > 0
                    ) {
                      const getProduct =
                        await productBuyXGetYfree(discountDetails)
                      cart.push(getProduct[0])
                      item.discountTitle = discountDetails.discountTitle
                      item.discountId = discountDetails._id
                      item.discountDetails = discountDetails
                      item.isGiftedItem = true
                      item.applicableDiscounts = [discountDetails]
                    }
                  } else {
                    const parentProduct = discountData?.filter(
                      discount =>
                        discount.selectedBuyProducts.some(
                          product =>
                            product._id.toString() === item._id.toString()
                        ) &&
                        (item.rows.variantData
                          ? matchingArray(
                              discount.selectedBuyProducts.find(
                                product =>
                                  product._id.toString() === item._id.toString()
                              ).variantData,
                              item.rows.variantData
                            )
                          : true)
                    )
                    // //
                    if (
                      parseFloat(item.rows.mrp) >=
                        discountDetails.minimumBuyPurchaseAmt ||
                      productFreeCount <= discountDetails.getQuantity
                    ) {
                      productFreeCount++
                      item.discountApplicable = true
                      item.discountTitle = discountDetails.discountTitle
                      item.discountId = discountDetails._id
                      item.discountDetails = discountDetails
                      discountApplied = true // Set flag to true
                      item.isGiftedItem = true
                      item.applicableDiscounts = [discountDetails]
                      // item.isChiled = parentProduct && parentProduct?.length ? false : true
                    }
                    //
                  }
                }
              }
            })
          )
        }
      } else if (discountDetails?.discountType === 'amountOffProduct') {
        await Promise.all(
          cart.map(async (item, index) => {
            // if (!item.discountApplicable) {
            // item.discountApplicable = false;
            // item.discountTitle = "";
            // item.discountId = "";
            // item.discountDetails = null;
            const categoryIdsArray = item.categoryIds.split(',')
            let discountApplied = false // Flag to track if discount applied
            if (
              discountDetails &&
              discountDetails.selectedAppliesCategories.length > 0
            ) {
              if (discountDetails?.discountValueType === 'PERCENTAGE') {
                if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'NO_MINIMUM_REQUIREMENT'
                ) {
                  const selectedAppliesCategories =
                    discountDetails?.selectedAppliesCategories
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalCount
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  //
                  if (
                    item.categoryIds
                      .split(',')
                      .some(catId =>
                        selectedAppliesCategories
                          ?.map(category => category._id)
                          .includes(catId)
                      )
                  ) {
                    item.discountDetails = highestDiscount
                    item.discountApplicable = true
                    item.discountTitle = highestDiscount?.discountTitle
                    item.discountId = highestDiscount?._id
                    item.applicableDiscounts = applicableDiscounts
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_QUANTITY_ITEMS'
                ) {
                  const selectedAppliesCategories =
                    discountDetails?.selectedAppliesCategories
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalCount
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  //

                  // //
                  if (
                    item.categoryIds
                      .split(',')
                      .some(catId =>
                        selectedAppliesCategories
                          ?.map(category => category._id)
                          .includes(catId)
                      )
                  ) {
                    if (
                      totalCount >= highestDiscount?.minimumPurchaseQuantity
                    ) {
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_PURCHASE_AMOUNT'
                ) {
                  const selectedAppliesCategories =
                    discountDetails?.selectedAppliesCategories
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalCount
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => selectedAppliesCategories.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);

                  //
                  if (
                    item.categoryIds
                      .split(',')
                      .some(catId =>
                        selectedAppliesCategories
                          ?.map(category => category._id)
                          .includes(catId)
                      )
                  ) {
                    if (totalPrice >= highestDiscount?.minimumPurchaseAmount) {
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                }
              } else if (
                discountDetails?.discountValueType === 'FIXED_AMOUNT'
              ) {
                if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'NO_MINIMUM_REQUIREMENT'
                ) {
                  // const selectedAppliesCategories = discountDetails?.selectedAppliesCategories;
                  // const discountValueAmount = discountDetails?.discountValueAmount;
                  // // Apply discount to items in cart
                  // if (item.categoryIds.split(',').some(catId => selectedAppliesCategories?.map(category => category._id).includes(catId))) {
                  //   item.rows.discount = parseFloat(item.rows.mrp) - parseFloat(item.rows.perProductPrice);
                  //   item.rows.discountId = discountDetails?._id;
                  //   item.rows.discountTitle = discountDetails?.discountTitle;
                  //   item.discountApplicable = true;
                  //   item.discountTitle = discountDetails?.discountTitle;
                  //   item.discountId = discountDetails?._id;
                  // }

                  const selectedAppliesCategories =
                    discountDetails?.selectedAppliesCategories
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalCount
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  if (
                    item.categoryIds
                      .split(',')
                      .some(catId =>
                        selectedAppliesCategories
                          ?.map(category => category._id)
                          .includes(catId)
                      )
                  ) {
                    item.discountApplicable = true
                    item.discountTitle = highestDiscount?.discountTitle
                    item.discountId = highestDiscount?._id
                    //
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_QUANTITY_ITEMS'
                ) {
                  //
                  const selectedAppliesCategories =
                    discountDetails?.selectedAppliesCategories
                  const totalCount = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity
                        : 0),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalCount,
                    discountData
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  //
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => selectedAppliesCategories.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);
                  //
                  if (
                    item.categoryIds
                      .split(',')
                      .some(catId =>
                        selectedAppliesCategories
                          ?.map(category => category._id)
                          .includes(catId)
                      )
                  ) {
                    if (
                      totalCount >= highestDiscount?.minimumPurchaseQuantity
                    ) {
                      //
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      // item.rows.discount = parseFloat(item.rows.mrp) - parseFloat(item.rows.perProductPrice);
                      // item.rows.discountId = discountDetails?._id;
                      // item.rows.discountTitle = discountDetails?.discountTitle;
                      // if (item.categoryIds.split(',').some(catId => selectedAppliesCategories?.map(category => category._id).includes(catId))) {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                      // }
                    }
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_PURCHASE_AMOUNT'
                ) {
                  const selectedAppliesCategories =
                    discountDetails?.selectedAppliesCategories
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => selectedAppliesCategories.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);
                  const totalPrice = cart.reduce(
                    (total, item) =>
                      total +
                      (item.categoryIds
                        .split(',')
                        .some(id =>
                          selectedAppliesCategories
                            .map(cat => cat._id)
                            .includes(id)
                        )
                        ? item.quantity * parseFloat(item.rows.mrp)
                        : 0),
                    0
                  )
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  // const totalCount = cart.reduce((total, item) => total + (item.categoryIds.split(',').some(id => selectedAppliesCategories.map(cat => cat._id).includes(id)) ? item.quantity : 0), 0);

                  if (
                    item.categoryIds
                      .split(',')
                      .some(catId =>
                        selectedAppliesCategories
                          ?.map(category => category._id)
                          .includes(catId)
                      )
                  ) {
                    if (totalPrice >= highestDiscount?.minimumPurchaseAmount) {
                      // const newMrp = item.rows.perProductPrice;
                      // item.rows.mrp = newMrp;
                      // item.rows.perProductPrice -= discountValueAmount;
                      // item.rows.basePrice = item.rows.perProductPrice;
                      // item.rows.discount = parseFloat(item.rows.mrp) - parseFloat(item.rows.perProductPrice);
                      // item.rows.discountId = discountDetails?._id;
                      // item.rows.discountTitle = discountDetails?.discountTitle;
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      // item.rows.discount = parseFloat(item.rows.mrp) - parseFloat(item.rows.perProductPrice);
                      // item.rows.discountId = discountDetails?._id;
                      // item.rows.discountTitle = discountDetails?.discountTitle;
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                }
              }
            } else if (
              discountDetails &&
              discountDetails.selectedAppliesProducts.length > 0
            ) {
              if (discountDetails?.discountValueType === 'PERCENTAGE') {
                if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'NO_MINIMUM_REQUIREMENT'
                ) {
                  const selectedAppliesProducts =
                    discountDetails?.selectedAppliesProducts
                  const selectedProduct = selectedAppliesProducts.find(
                    product =>
                      product._id.toString() === item._id.toString() &&
                      (item.rows.variantData.length > 0
                        ? compareArrays(
                            product.variantData,
                            item.rows.variantData
                          )
                        : true)
                  )
                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)

                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalQuantity
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  // Apply discount to items in cart
                  if (selectedProduct) {
                    item.discountApplicable = true
                    item.discountTitle = highestDiscount?.discountTitle
                    item.discountId = highestDiscount?._id
                    item.applicableDiscounts = applicableDiscounts
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_QUANTITY_ITEMS'
                ) {
                  const selectedAppliesProducts =
                    discountDetails?.selectedAppliesProducts
                  // const selectedAppliesCategories = discountDetails?.selectedAppliesCategories;

                  const isProductAvailable = selectedAppliesProducts.find(
                    product =>
                      product._id.toString() === item._id.toString() &&
                      (item.rows.variantData.length > 0
                        ? compareArrays(
                            product.variantData,
                            item.rows.variantData
                          )
                        : true)
                  )

                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)

                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalQuantity
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  // //
                  if (isProductAvailable) {
                    if (
                      totalQuantity >= highestDiscount?.minimumPurchaseQuantity
                    ) {
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_PURCHASE_AMOUNT'
                ) {
                  const selectedAppliesProducts =
                    discountDetails?.selectedAppliesProducts
                  const isProductAvailable = selectedAppliesProducts.find(
                    product =>
                      product._id.toString() === item._id.toString() &&
                      compareArrays(product.variantData, item.rows.variantData)
                  )
                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        compareArrays(
                          product.variantData,
                          cartItem.rows.variantData
                        )
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)
                  //
                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalQuantity
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  if (isProductAvailable) {
                    if (totalPrice >= highestDiscount?.minimumPurchaseAmount) {
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                }
              } else if (
                discountDetails?.discountValueType === 'FIXED_AMOUNT'
              ) {
                if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'NO_MINIMUM_REQUIREMENT'
                ) {
                  const selectedAppliesProducts =
                    discountDetails?.selectedAppliesProducts
                  const selectedProduct = selectedAppliesProducts.find(
                    product =>
                      product._id.toString() === item._id.toString() &&
                      (item.rows.variantData.length > 0
                        ? compareArrays(
                            product.variantData,
                            item.rows.variantData
                          )
                        : true)
                  )
                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)

                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalQuantity
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  // Apply discount to items in cart
                  if (selectedProduct) {
                    item.discountApplicable = true
                    item.discountTitle = highestDiscount?.discountTitle
                    item.discountId = highestDiscount?._id
                    item.applicableDiscounts = applicableDiscounts
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_QUANTITY_ITEMS'
                ) {
                  const selectedAppliesProducts =
                    discountDetails?.selectedAppliesProducts
                  // const totalQuantity = cart.reduce((acc, cartItem) => acc + selectedAppliesProducts.filter(product => product._id === cartItem._id && compareArrays(product.variantData, cartItem.rows.variantData)).length, 0);
                  const isProductAvailable = selectedAppliesProducts.find(
                    product =>
                      product._id.toString() === item._id.toString() &&
                      compareArrays(product.variantData, item.rows.variantData)
                  )
                  // //
                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)

                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalQuantity
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray

                  if (isProductAvailable) {
                    if (
                      totalQuantity >= highestDiscount?.minimumPurchaseQuantity
                    ) {
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                } else if (
                  discountDetails?.minimumPurchaseRequirement ===
                  'MINIMUM_PURCHASE_AMOUNT'
                ) {
                  const selectedAppliesProducts =
                    discountDetails?.selectedAppliesProducts
                  const isProductAvailable = selectedAppliesProducts.find(
                    product =>
                      product._id.toString() === item._id.toString() &&
                      compareArrays(product.variantData, item.rows.variantData)
                  )

                  const totalQuantity = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return acc + cartItem.quantity
                    }
                    return acc
                  }, 0)
                  const totalPrice = cart.reduce((acc, cartItem) => {
                    const matchingProduct = selectedAppliesProducts.find(
                      product =>
                        product._id.toString() === cartItem._id.toString() &&
                        (cartItem.rows.variantData.length > 0
                          ? compareArrays(
                              product.variantData,
                              cartItem.rows.variantData
                            )
                          : true)
                    )
                    if (matchingProduct) {
                      return (
                        acc + cartItem.quantity * parseFloat(cartItem.rows.mrp)
                      )
                    }
                    return acc
                  }, 0)

                  const discountResult = findHighestDiscount(
                    discountDetails,
                    item,
                    totalPrice,
                    discountData,
                    totalQuantity
                  )
                  const highestDiscount = discountResult.highestDiscount
                  const applicableDiscounts =
                    discountResult.matchingDiscountArray
                  if (isProductAvailable) {
                    if (totalPrice >= highestDiscount?.minimumPurchaseAmount) {
                      item.discountApplicable = true
                      item.discountTitle = highestDiscount?.discountTitle
                      item.discountId = highestDiscount?._id
                    } else {
                      item.discountApplicable = true
                      item.discountTitle = discountDetails?.discountTitle
                      item.discountId = discountDetails?._id
                      item.applicableDiscounts = applicableDiscounts
                    }
                  }
                }
              }
              //
            }
            // }
          })
        )
      }
    })
  )

  //
  // cart.push(...productsToAdd);
  const uniqueCartArray = Array.from(
    new Set(cart.map(item => JSON.stringify(item)))
  ).map(item => JSON.parse(item))

  const finalCart = await sortDiscountApplicableProduct(
    uniqueCartArray,
    discountData
  )
  // Return the modified cart array as the finalCart
  // const finalCart = cart;
  // //
  // Output the updated cart array with discountApplicable flag
  return finalCart || []
}

// SUBTOTAL
const calculateSubTotal = async cartItems => {
  return cartItems?.reduce(
    (total, item) => total + item.quantity * parseFloat(item.rows.mrp),
    0
  )
}
// TOTAL QUANTITY
const calculateTotalQty = async cartItems => {
  return cartItems?.reduce((total, item) => total + item.quantity, 0)
}
// OTHER DISCOUNT CALCULATION
const calculateDiscount = async cartItems => {
  return cartItems?.reduce(
    (total, item) => total + item.quantity * item.rows?.discount || 0,
    0
  )
}
// ORDER TOTAL
const calculateOrderTotal = async (
  subTotal,
  discountAmount,
  shippingAmount,
  extraDiscount,
  offerDiscount
) => {
  // extraDiscount is in percentage
  const total = subTotal - discountAmount
  const extraDiscountAmount = extraDiscount ? (total * extraDiscount) / 100 : 0
  return shippingAmount > 0
    ? Math.round(total + shippingAmount - extraDiscountAmount - offerDiscount)
    : Math.round(total - extraDiscountAmount - offerDiscount)
}

// Function to duplicate objects with quantity greater than 1
const duplicateObjects = array =>
  array.flatMap(subArray =>
    subArray.flatMap(obj =>
      obj.quantity > 1 ? Array(obj.quantity).fill({ ...obj, quantity: 1 }) : obj
    )
  )
function getDiscountAmount(
  mainDiscount,
  totalCount,
  discountData,
  group,
  duplicatedCombinations
) {
  //
  // Initialize total amount with the base price multiplied by the item quantity
  let totalAmount = 0
  // Create a temporary variable to store the remaining quantity
  let remainingQuantity = totalCount
  // Sort discounts by minimum purchase quantity in descending order
  discountData.sort(
    (a, b) => b.minimumPurchaseQuantity - a.minimumPurchaseQuantity
  )
  const mrpValues = [
    ...duplicatedCombinations.map(obj => parseFloat(obj.rows.mrp))
  ] // Create a copy of the array
  mrpValues.sort((a, b) => a - b)
  if (mainDiscount?.discountType === 'amountOffProduct') {
    if (mainDiscount && mainDiscount.selectedAppliesCategories.length > 0) {
      if (mainDiscount.discountValueType === 'PERCENTAGE') {
        if (
          mainDiscount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
        ) {
          //
          // discountData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // for (let i = 0; i < discountData.length; i++) {
          // const discount = discountData[0];
          // const discount = discountData.find(discount =>
          //   discount.discountValueType === "PERCENTAGE" &&
          //   discount.minimumPurchaseRequirement === "NO_MINIMUM_REQUIREMENT"
          // );
          const discount = discountData.find(
            discount =>
              discount._id.toString() === group[0]?.discountId.toString()
          )
          // Check if the discount is applicable based on remaining quantity
          // while (remainingQuantity >= discount.minimumPurchaseQuantity) {
          let totalMrp
          if (group.length === 1) {
            totalMrp = group.reduce(
              (acc, item) =>
                acc + parseFloat(item.rows.mrp) * parseFloat(item.quantity),
              0
            )
          } else if (group.length <= totalCount) {
            const applicableItems = mrpValues.splice(
              0,
              discount.minimumPurchaseQuantity
            )
            // totalMrp = applicableItems.reduce((sum, price) => sum + price, 0);
            totalMrp = group.reduce(
              (acc, item) =>
                acc + parseFloat(item.rows.mrp) * parseFloat(item.quantity),
              0
            )
            // //
          }
          // let applicableQuantity = discount.minimumPurchaseQuantity;
          totalAmount +=
            (parseFloat(totalMrp) * parseFloat(discount.discountValuePercent)) /
            100
          // Update remaining quantity for the next discount calculation
          // remainingQuantity -= applicableQuantity;
          // }
          // }
        } else if (
          mainDiscount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
        ) {
          const discount = discountData.find(
            discount =>
              discount._id.toString() === group[0]?.discountId.toString()
          )
          // Iterate over each discount in discountData array
          // for (let i = 0; i < discountData.length; i++) {
          // const discount = discountData[i];
          //
          // Check if the discount is applicable based on remaining quantity
          while (remainingQuantity >= discount.minimumPurchaseQuantity) {
            //
            let totalMrp = 0
            if (group.length === 1) {
              totalMrp = group.reduce(
                (acc, item) =>
                  acc + parseFloat(item.rows.mrp) * parseInt(item.quantity),
                0
              )
            } else if (group.length <= totalCount) {
              //
              // const applicableItems = mrpValues.splice(0, discount.minimumPurchaseQuantity);
              totalMrp = mrpValues.reduce((sum, price) => sum + price, 0)
              // //
            }

            let applicableQuantity = discount.minimumPurchaseQuantity
            //
            if (totalAmount === 0) {
              totalAmount +=
                (parseFloat(totalMrp) *
                  parseFloat(discount.discountValuePercent)) /
                100
            }
            //
            // Update remaining quantity for the next discount calculation
            remainingQuantity -= applicableQuantity
            // remainingQuantity--; // this is comment because multiple discount not work like 20% and 50%
          }

          // }
        } else if (
          mainDiscount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
        ) {
          const discount = discountData.find(
            discount =>
              discount._id.toString() === group[0]?.discountId.toString()
          )

          // for (let i = 0; i < discountData.length; i++) {
          // const discount = discountData[i];
          // Check if the discount is applicable based on remaining quantity
          // while (remainingQuantity >= discount.minimumPurchaseQuantity) {
          let totalMrp = 0
          if (group.length === 1) {
            totalMrp = group.reduce(
              (acc, item) =>
                acc +
                parseFloat(item.rows.mrp) *
                  parseFloat(discount.minimumPurchaseQuantity),
              0
            )
          } else if (group.length <= totalCount) {
            const applicableItems = mrpValues.splice(
              0,
              discount.minimumPurchaseQuantity
            )
            totalMrp = applicableItems.reduce((sum, price) => sum + price, 0)
            // //
          }
          // let applicableQuantity = discount.minimumPurchaseQuantity;
          totalAmount +=
            (parseFloat(totalMrp) * parseFloat(discount.discountValuePercent)) /
            100
          // Update remaining quantity for the next discount calculation
          // remainingQuantity -= applicableQuantity;
          // }
        }
        // }
      } else if (mainDiscount.discountValueType === 'FIXED_AMOUNT') {
        if (
          mainDiscount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
        ) {
          //
          // discountData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // for (let i = 0; i < discountData.length; i++) {
          // const discount = discountData[0];
          // const discount = discountData.find(discount =>
          //   discount.discountValueType === "FIXED_AMOUNT" &&
          //   discount.minimumPurchaseRequirement === "NO_MINIMUM_REQUIREMENT"
          // );
          const discount = discountData.find(
            discount =>
              discount._id.toString() === group[0]?.discountId.toString()
          )
          // Check if the discount is applicable based on remaining quantity
          // while (remainingQuantity >= discount.minimumPurchaseQuantity) {
          let totalMrp
          if (group.length === 1) {
            totalMrp = group.reduce(
              (acc, item) =>
                acc + parseFloat(item.rows.mrp) * parseFloat(item.quantity),
              0
            )
          } else if (group.length <= totalCount) {
            const applicableItems = mrpValues.splice(
              0,
              discount.minimumPurchaseQuantity
            )
            // totalMrp = applicableItems.reduce((sum, price) => sum + price, 0);
            totalMrp = group.reduce(
              (acc, item) =>
                acc + parseFloat(item.rows.mrp) * parseFloat(item.quantity),
              0
            )
            // //
          } //
          //
          // let applicableQuantity = discount.minimumPurchaseQuantity;
          totalAmount +=
            discount.discountValueAmount * duplicatedCombinations?.length
          // Update remaining quantity for the next discount calculation
          // remainingQuantity -= applicableQuantity;
          // }
          // }
        } else if (
          mainDiscount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
        ) {
          // Iterate over each discount in discountData array
          const discount = discountData.find(
            discount =>
              discount._id.toString() === group[0]?.discountId.toString()
          )
          // for (let i = 0; i < discountData.length; i++) {
          // const discount = discountData[i];
          //
          // Check if the discount is applicable based on remaining quantity
          while (remainingQuantity >= discount.minimumPurchaseQuantity) {
            // let totalMrp;
            // if (group.length === 1) {
            //   totalMrp = group.reduce((acc, item) => acc + (parseFloat(item.rows.mrp) * parseInt(item.quantity)), 0);
            // } else if (group.length <= totalCount) {
            //   const applicableItems = mrpValues.splice(0, discount.minimumPurchaseQuantity);
            //   totalMrp = applicableItems.reduce((sum, price) => sum + price, 0);
            //   // //
            // }
            let applicableQuantity = discount.minimumPurchaseQuantity
            if (totalAmount === 0) {
              totalAmount += discount?.discountValueAmount
            }
            // Update remaining quantity for the next discount calculation
            remainingQuantity -= applicableQuantity
            // remainingQuantity--; // or another update that ensures the loop can terminate
          }
          // }
        }
      }
    } else if (
      mainDiscount &&
      mainDiscount.selectedAppliesProducts.length > 0
    ) {
      if (mainDiscount.discountValueType === 'PERCENTAGE') {
        if (
          mainDiscount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
        ) {
          for (let i = 0; i < discountData.length; i++) {
            const discount = discountData[i]
            // Check if the discount is applicable based on remaining quantity
            while (remainingQuantity >= discount.minimumPurchaseQuantity) {
              let totalMrp = 0
              if (group.length === 1) {
                totalMrp = group.reduce(
                  (acc, item) =>
                    acc +
                    parseFloat(item.rows.mrp) *
                      parseFloat(discount.minimumPurchaseQuantity),
                  0
                )
              } else if (group.length <= totalCount) {
                const applicableItems = mrpValues.splice(
                  0,
                  discount.minimumPurchaseQuantity
                )
                totalMrp = applicableItems.reduce(
                  (sum, price) => sum + price,
                  0
                )
                // //
              }
              let applicableQuantity = discount.minimumPurchaseQuantity
              totalAmount +=
                (parseFloat(totalMrp) *
                  parseFloat(discount.discountValuePercent)) /
                100
              // Update remaining quantity for the next discount calculation
              // remainingQuantity -= applicableQuantity;
              remainingQuantity-- // or another update that ensures the loop can terminate
            }
          }
        } else if (
          mainDiscount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
        ) {
          // for (let i = 0; i < discountData.length; i++) {
          const totalProductMrp = group.reduce(
            (acc, item) =>
              acc + parseFloat(item.rows.mrp) * parseFloat(item.quantity),
            0
          )
          const discountResult = findHighestDiscount(
            mainDiscount,
            group[0],
            totalProductMrp,
            discountData
          )
          const discount = discountResult.highestDiscount

          // const discount = discountData[i];
          // Check if the discount is applicable based on remaining quantity
          // while (remainingQuantity >= discount.minimumPurchaseQuantity) {
          let totalMrp = 0
          if (group.length === 1) {
            totalMrp = group.reduce(
              (acc, item) =>
                acc + parseFloat(item.rows.mrp) * parseFloat(item.quantity),
              0
            )
          } else if (group.length <= totalCount) {
            const applicableItems = mrpValues.splice(
              0,
              discount.minimumPurchaseQuantity
            )
            totalMrp = applicableItems.reduce((sum, price) => sum + price, 0)
            // //
          }
          //
          // let applicableQuantity = discount.minimumPurchaseQuantity;
          totalAmount +=
            (parseFloat(totalMrp) *
              parseFloat(discount?.discountValuePercent)) /
            100
          // Update remaining quantity for the next discount calculation
          // remainingQuantity -= applicableQuantity;
          // }
          // }
        }
      } else if (mainDiscount.discountValueType === 'FIXED_AMOUNT') {
        if (
          mainDiscount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
        ) {
          for (let i = 0; i < discountData.length; i++) {
            const discount = discountData[i]
            // Check if the discount is applicable based on remaining quantity
            while (remainingQuantity >= discount.minimumPurchaseQuantity) {
              let totalMrp = 0
              if (group.length === 1) {
                totalMrp = group.reduce(
                  (acc, item) =>
                    acc +
                    parseFloat(item.rows.mrp) *
                      parseFloat(discount.minimumPurchaseQuantity),
                  0
                )
              } else if (group.length <= totalCount) {
                const applicableItems = mrpValues.splice(
                  0,
                  discount.minimumPurchaseQuantity
                )
                totalMrp = applicableItems.reduce(
                  (sum, price) => sum + price,
                  0
                )
                // //
              }
              let applicableQuantity = discount.minimumPurchaseQuantity
              totalAmount += discount.discountValueAmount
              // Update remaining quantity for the next discount calculation
              // remainingQuantity -= applicableQuantity;
              remainingQuantity-- // or another update that ensures the loop can terminate
            }
          }
        }
      }
    }
  }
  return totalAmount
}
const calculateOfferDiscount = async (cart, discountData) => {
  // Filter items with discountId and remove blank discountId items
  const itemsWithDiscountId = cart.filter(item => item.discountId !== '')

  // Group items by discountId
  const groupedByDiscountId = itemsWithDiscountId.reduce((acc, item) => {
    if (!acc[item.discountId]) {
      acc[item.discountId] = []
    }
    acc[item.discountId].push(item)
    return acc
  }, {})

  let totalDiscount = 0
  // //
  // Iterate over groups
  for (const [discountId, group] of Object.entries(groupedByDiscountId)) {
    // Find the corresponding discount data
    const discount = discountData.find(
      discount => discount._id.toString() === discountId
    )
    if (!discount) {
      continue // Skip if no corresponding discount data is found
    }
    if (discount?.discountType === 'buyXgetY') {
      if (discount?.customerBuy === 'MINIMUM_QTY_ITEM') {
        if (discount && discount.selectedBuyCategories.length > 0) {
          if (discount?.selectedGetProducts?.length > 0) {
            const getFreeQuantity = discount.getQuantity
            const chiledProduct = []
            group.forEach(item => {
              if (item.isChiled) {
                chiledProduct.push(item)
              }
            })
            const totalValue = chiledProduct[0]?.rows?.mrp
            totalDiscount += totalValue
            // //
          } else {
            // Calculate total buy and get quantity required for the discount
            const totalBuyGetQty =
              discount.minimumBuyQuantity + discount.getQuantity
            const getFreeQuantity = discount.getQuantity
            // Initialize an array to store combinations
            let combinations = []

            // Iterate over each item in the group
            group.forEach((item, index) => {
              const currentCombination = [item]
              let currentQuantity = item.quantity
              let currentIndex = index + 1
              if (item.isPair === 'PAIRED' || currentQuantity > 1) {
                // Find combinations with remaining items in the group
                while (
                  currentIndex < group.length &&
                  currentQuantity < getFreeQuantity
                ) {
                  const nextItem = group[currentIndex]
                  currentCombination.push(nextItem)
                  currentQuantity += nextItem.quantity
                  currentIndex++
                }
                // Add the combination to the combinations array
                if (currentQuantity >= getFreeQuantity) {
                  combinations.push(currentCombination)
                }
              }
            })
            // Duplicate objects to match the total number of discounts
            // const duplicatedCombinations = duplicateObjects(group);
            // const duplicatedCombinations = group.map(item => ({ ...item, totalQuantity: item.quantity }));
            const duplicatedCombinations = group.flatMap(item =>
              Array.from({ length: item.quantity }, () => ({
                ...item,
                quantity: 1
              }))
            )

            const totalQuantity = group.reduce(
              (total, item) => total + item.quantity,
              0
            )

            const numberOfSets = Math.floor(totalQuantity / totalBuyGetQty)
            const freeQty = numberOfSets * parseInt(getFreeQuantity)

            const lowestPrices = duplicatedCombinations
              .flatMap(obj => parseFloat(obj.rows.mrp))
              .sort((a, b) => a - b)
              .slice(0, freeQty)
            const totalValue = lowestPrices.reduce(
              (sum, price) => sum + price,
              0
            )
            //
            totalDiscount += totalValue
          }
        } else if (discount && discount.selectedBuyProducts.length > 0) {
          if (discount?.selectedBuyCategories) {
            // Calculate total buy and get quantity required for the discount
            const totalBuyGetQty =
              discount.minimumBuyQuantity + discount.getQuantity
            const getFreeQuantity = discount.getQuantity
            // Initialize an array to store combinations
            let combinations = []

            // Iterate over each item in the group
            group.forEach((item, index) => {
              const currentCombination = [item]
              let currentQuantity = item.quantity
              let currentIndex = index

              if (item.isFree) {
                // Find combinations with remaining items in the group
                // while (currentIndex < group.length && currentQuantity < getFreeQuantity) {
                const nextItem = group[currentIndex]
                currentCombination.push(nextItem)
                currentQuantity += nextItem.quantity
                currentIndex++
                // }
                // Add the combination to the combinations array
                // if (currentQuantity >= getFreeQuantity) {
                //
                combinations.push(item)
                // }
              }
            })
            const duplicatedCombinations = group.flatMap(item =>
              Array.from({ length: item.quantity }, () => ({
                ...item,
                quantity: 1
              }))
            )

            const totalQuantity = group.reduce(
              (total, item) => total + item.quantity,
              0
            )

            const numberOfSets = Math.floor(totalQuantity / totalBuyGetQty)
            const freeQty = numberOfSets * parseInt(getFreeQuantity)

            const lowestPrices = duplicatedCombinations
              .flatMap(obj => parseFloat(obj.rows.mrp))
              .sort((a, b) => a - b)
              .slice(0, freeQty)
            const totalValue = lowestPrices.reduce(
              (sum, price) => sum + price,
              0
            )
            totalDiscount += totalValue
          } else {
            let combinations = []
            // Iterate over each item in the group
            group.forEach((item, index) => {
              const currentCombination = [item]
              let currentQuantity = item.quantity
              let currentIndex = index + 1
              if (item.isChiled) {
                combinations.push(currentCombination)
              }
            })
            const duplicatedCombinations = duplicateObjects(combinations)
            const lowestPrices = duplicatedCombinations
              .flatMap(obj => parseFloat(obj.rows.mrp))
              .sort((a, b) => a - b)
            const totalValue = lowestPrices.reduce(
              (sum, price) => sum + price,
              0
            )
            totalDiscount += totalValue
          }
        }
      } else if (discount?.customerBuy === 'MINIMUM_PURCHASE_AMOUNT') {
        const getFreeQuantity = discount.getQuantity
        let combinations = []
        // Iterate over each item in the group
        group.forEach((item, index) => {
          const currentCombination = [item]
          let currentQuantity = item.quantity
          let currentIndex = index + 1
          if (item.isPair === 'PAIRED') {
            combinations.push(currentCombination)
          }
        })
        const duplicatedCombinations = duplicateObjects(combinations)
        const freeQty = parseInt(getFreeQuantity)
        const lowestPrices = duplicatedCombinations
          .flatMap(obj => parseFloat(obj.rows.mrp))
          .sort((a, b) => a - b)
          .slice(0, freeQty)
        const totalValue = lowestPrices.reduce((sum, price) => sum + price, 0)
        totalDiscount += totalValue
      }
    } else if (discount?.discountType === 'amountOffProduct') {
      if (discount && discount.selectedAppliesCategories.length > 0) {
        if (discount.discountValueType === 'PERCENTAGE') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            let totalQuantity = group.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)
            discountAmount += getDiscountAmount(
              discount,
              totalQuantity,
              discountData,
              group,
              duplicatedCombinations
            )
            totalDiscount += discountAmount
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            // Get total quantity
            let totalQuantity = group.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)
            //
            discountAmount += getDiscountAmount(
              discount,
              totalQuantity,
              discountData,
              group,
              duplicatedCombinations
            )
            //
            if (combinations && combinations?.length > 0) {
              // totalDiscount += finalAmount;
              totalDiscount += discountAmount
            }
            // totalDiscount += discountAmount
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            // let totalPrice = group.reduce((acc, item) => acc + (parseFloat(item.quantity)*parseFloat(item?.rows.mrp)), 0);
            const duplicatedCombinations = duplicateObjects(combinations)
            // discountAmount += getDiscountAmount(discount, totalPrice, discountData, group, duplicatedCombinations);
            const lowestPrices = duplicatedCombinations
              .flatMap(obj => parseFloat(obj.rows.mrp))
              .sort((a, b) => a - b)
            const totalValue = lowestPrices.reduce(
              (sum, price) => sum + price,
              0
            )
            if (combinations && combinations?.length > 0) {
              const finalAmount =
                (totalValue * discount?.discountValuePercent) / 100
              totalDiscount += finalAmount
            }
          }
        } else if (discount?.discountValueType === 'FIXED_AMOUNT') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })

            let totalQuantity = group.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)
            discountAmount += getDiscountAmount(
              discount,
              totalQuantity,
              discountData,
              group,
              duplicatedCombinations
            )
            totalDiscount += discountAmount
            // const duplicatedCombinations = duplicateObjects(combinations);
            // const lowestPrices = duplicatedCombinations.flatMap(obj => obj.rows.perProductPrice).sort((a, b) => a - b);
            // const totalValue = lowestPrices.reduce((sum, price) => sum + price, 0);
            // totalDiscount += lowestPrices?.length * discount?.discountValueAmount;
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            // const duplicatedCombinations = duplicateObjects(combinations);
            // const lowestPrices = duplicatedCombinations.flatMap(obj => obj.rows.perProductPrice).sort((a, b) => a - b);
            // const totalValue = lowestPrices.reduce((sum, price) => sum + price, 0);

            let totalQuantity = group.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)
            //
            discountAmount += getDiscountAmount(
              discount,
              totalQuantity,
              discountData,
              group,
              duplicatedCombinations
            )
            //
            if (combinations && combinations?.length > 0) {
              // totalDiscount += discount?.discountValueAmount;
              totalDiscount += discountAmount
            }
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            let combinations = []
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            if (combinations && combinations?.length > 0) {
              totalDiscount += discount?.discountValueAmount
            }
          }
        }
      } else if (discount && discount.selectedAppliesProducts.length > 0) {
        if (discount.discountValueType === 'PERCENTAGE') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            let combinations = []
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            const duplicatedCombinations = duplicateObjects(combinations)
            const lowestPrices = duplicatedCombinations
              .flatMap(obj => parseFloat(obj.rows.mrp))
              .sort((a, b) => a - b)
            const totalValue = lowestPrices.reduce(
              (sum, price) => sum + price,
              0
            )
            const finalAmount =
              (totalValue * discount?.discountValuePercent) / 100
            totalDiscount += finalAmount
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            //
            // let combinations = [];
            // group.forEach((item, index) => {
            //   const currentCombination = [item];
            //   if (item.isPair === "PAIRED") {
            //     combinations.push(currentCombination);
            //   }
            // });
            // const duplicatedCombinations = duplicateObjects(combinations);
            // const lowestPrices = duplicatedCombinations.flatMap(obj => obj.rows.perProductPrice).sort((a, b) => a - b);
            // const totalValue = lowestPrices.reduce((sum, price) => sum + price, 0);
            // if (combinations && combinations?.length > 0) {
            //   const finalAmount = (totalValue * discount?.discountValuePercent) / 100;
            //   totalDiscount += finalAmount;
            // }
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            // Get total quantity
            let totalQuantity = group.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)
            discountAmount += getDiscountAmount(
              discount,
              totalQuantity,
              discountData,
              group,
              duplicatedCombinations
            )
            if (combinations && combinations?.length > 0) {
              // totalDiscount += finalAmount;
              totalDiscount += discountAmount
            }
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            // const duplicatedCombinations = duplicateObjects(combinations);
            // const lowestPrices = duplicatedCombinations.flatMap(obj => obj.rows.perProductPrice).sort((a, b) => a - b);
            // const totalValue = lowestPrices.reduce((sum, price) => sum + price, 0);
            let totalPrice = group.reduce(
              (acc, item) =>
                acc + parseInt(item.quantity) * parseFloat(item.rows.mrp),
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)

            discountAmount += getDiscountAmount(
              discount,
              totalPrice,
              discountData,
              group,
              duplicatedCombinations
            )
            //
            if (combinations && combinations?.length > 0) {
              // const finalAmount = (totalValue * discount?.discountValuePercent) / 100;
              totalDiscount += discountAmount
            }
          }
        } else if (discount?.discountValueType === 'FIXED_AMOUNT') {
          if (
            discount?.minimumPurchaseRequirement === 'NO_MINIMUM_REQUIREMENT'
          ) {
            let combinations = []
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            const duplicatedCombinations = duplicateObjects(combinations)
            const lowestPrices = duplicatedCombinations
              .flatMap(obj => parseFloat(obj.rows.mrp))
              .sort((a, b) => a - b)
            const totalValue = lowestPrices.reduce(
              (sum, price) => sum + price,
              0
            )
            totalDiscount +=
              lowestPrices?.length * discount?.discountValueAmount
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_QUANTITY_ITEMS'
          ) {
            // let combinations = [];
            // group.forEach((item, index) => {
            //   const currentCombination = [item];
            //   if (item.isPair === "PAIRED") {
            //     combinations.push(currentCombination);
            //   }
            // });
            // if (combinations && combinations?.length > 0) {
            //   totalDiscount += discount?.discountValueAmount;
            // }
            let combinations = []
            let discountAmount = 0
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            // Get total quantity
            let totalQuantity = group.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const duplicatedCombinations = duplicateObjects(combinations)
            discountAmount += getDiscountAmount(
              discount,
              totalQuantity,
              discountData,
              group,
              duplicatedCombinations
            )
            if (combinations && combinations?.length > 0) {
              // totalDiscount += finalAmount;
              totalDiscount += discountAmount
            }
          } else if (
            discount?.minimumPurchaseRequirement === 'MINIMUM_PURCHASE_AMOUNT'
          ) {
            let combinations = []
            group.forEach((item, index) => {
              const currentCombination = [item]
              if (item.isPair === 'PAIRED') {
                combinations.push(currentCombination)
              }
            })
            if (combinations && combinations?.length > 0) {
              totalDiscount += discount?.discountValueAmount
            }
          }
        }
      }
    }
  }
  //
  return totalDiscount
}

export default async function getDiscountedItems(discountArr, totalCart) {
  // ===================================  BUY X GET Y BY BUY CATEGORY =====================================
  // Iterate over each item in the cart
  const catIdsArr = []
  totalCart.forEach(item => {
    // Split the categoryIds string by comma and trim each part
    const categoryIds = item?.categoryIds?.split(',').map(id => id.trim())
    // Concatenate categoryIds array with the result array
    catIdsArr.push(...categoryIds)
  })
  // const discountCategoryArr = discountArr?.filter(
  //   discount =>
  //     discount.selectedBuyCategories.some(category =>
  //       catIdsArr?.includes(category._id)
  //     ) ||
  //     discount.selectedAppliesCategories.some(category =>
  //       catIdsArr?.includes(category._id)
  //     )
  // )
  // const discountBuyXgetYbyProductArr = totalCart.flatMap(cartItem =>
  //   discountArr?.filter(discount =>
  //     discount.selectedBuyProducts.some(
  //       product =>
  //         product._id.toString() === cartItem._id.toString() &&
  //         compareArrays(product.variantData, cartItem.rows.variantData)
  //     )
  //   )
  // )
  // const discountAmountOffbyProductArr = totalCart.flatMap(cartItem =>
  //   discountArr?.filter(discount =>
  //     discount.selectedAppliesProducts.some(
  //       product =>
  //         product._id.toString() === cartItem._id.toString() &&
  //         compareArrays(product.variantData, cartItem.rows.variantData)
  //     )
  //   )
  // )
  //
  // if (discountCategoryArr && discountCategoryArr?.length > 0) {
  if (discountArr && discountArr?.length > 0) {
    const discountApplicableItems = await checkDiscountApplicable(
      totalCart,
      discountArr
    )
    const subTotal = await calculateSubTotal(discountApplicableItems)
    const totalQuantity = await calculateTotalQty(discountApplicableItems)
    const totalDiscount = await calculateDiscount(discountApplicableItems)
    const offerDiscount = await calculateOfferDiscount(
      discountApplicableItems,
      discountArr
    )
    const shipping = 'Free'

    const grandTotal = await calculateOrderTotal(
      subTotal,
      0,
      0,
      0,
      offerDiscount
    )
    const summary = {
      subTotal: subTotal,
      totalQuantity: totalQuantity,
      totalDiscount: 0,
      offerDiscount: offerDiscount,
      shipping: shipping,
      grandTotal: grandTotal
    }
    const data = { summary, cart: discountApplicableItems }

    return data
  } else {
    const subTotal = await calculateSubTotal(totalCart)
    const totalQuantity = await calculateTotalQty(totalCart)
    const totalDiscount = await calculateDiscount(totalCart)
    const offerDiscount = 0
    const shipping = 'Free'
    const grandTotal = await calculateOrderTotal(
      subTotal,
      totalDiscount,
      0,
      0,
      offerDiscount
    )

    const summary = {
      subTotal: subTotal,
      totalQuantity: totalQuantity,
      totalDiscount: totalDiscount || 0,
      offerDiscount: offerDiscount,
      shipping: shipping,
      grandTotal: grandTotal
    }
    const discountApplicableItems = totalCart
    const data = { summary, cart: discountApplicableItems }

    return data
  }

  // else if (discountBuyXgetYbyProductArr && discountBuyXgetYbyProductArr?.length > 0) {
  //   const discountApplicableItems = await checkDiscountApplicable(totalCart, discountBuyXgetYbyProductArr);
  //   const subTotal = await calculateSubTotal(discountApplicableItems);
  //   const totalQuantity = await calculateTotalQty(discountApplicableItems);
  //   const totalDiscount = await calculateDiscount(discountApplicableItems);
  //   const offerDiscount = await calculateOfferDiscount(discountApplicableItems, discountBuyXgetYbyProductArr);
  //   const shipping = "Free";
  //   const grandTotal = await calculateOrderTotal(subTotal, 0, 0, 0, offerDiscount);
  //   const summary = {
  //     subTotal: subTotal,
  //     totalQuantity: totalQuantity,
  //     totalDiscount: totalDiscount || 0,
  //     offerDiscount: offerDiscount,
  //     shipping: shipping,
  //     grandTotal: grandTotal,
  //   }
  //   const data = { summary, discountApplicableItems };
  //   return data;
  // } else if (discountAmountOffbyProductArr && discountAmountOffbyProductArr?.length > 0) {
  //   const discountApplicableItems = await checkDiscountApplicable(totalCart, discountAmountOffbyProductArr);
  //   const subTotal = await calculateSubTotal(discountApplicableItems);
  //   const totalQuantity = await calculateTotalQty(discountApplicableItems);
  //   const totalDiscount = await calculateDiscount(discountApplicableItems);
  //   const offerDiscount = await calculateOfferDiscount(discountApplicableItems, discountAmountOffbyProductArr);
  //   const shipping = "Free";
  //   const grandTotal = await calculateOrderTotal(subTotal, 0, 0, 0, offerDiscount);
  //   const summary = {
  //     subTotal: subTotal,
  //     totalQuantity: totalQuantity,
  //     totalDiscount: totalDiscount || 0,
  //     offerDiscount: offerDiscount,
  //     shipping: shipping,
  //     grandTotal: grandTotal,
  //   }
  //   const data = { summary, discountApplicableItems };
  //   return data;
  // }
}
