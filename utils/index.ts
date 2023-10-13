export const formatPrice = (price: number, decimal: number): string => {
  const currency = '฿'
  const formattedNumberWithCommas = Math.floor(price).toLocaleString()
  const fixedDecimalNumber = price.toFixed(decimal)
  return `${currency}${formattedNumberWithCommas}.${
    fixedDecimalNumber.split('.')[1]
  }`
}
