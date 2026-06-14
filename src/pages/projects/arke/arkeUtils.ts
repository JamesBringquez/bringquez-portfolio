/** Format price in Philippine Peso */
export function formatArkePrice(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`
}

export const ARKE_FREE_SHIPPING_MIN = 5000
