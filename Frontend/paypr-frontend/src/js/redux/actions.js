
export const UpdateStock = (data) => ({
    type: "UPDATE_STOCK",
    symbol: data.symbol,
    timestamp: data.lastUpdated,
    price: data.lastSalePrice,
    volume: data.volume
})
