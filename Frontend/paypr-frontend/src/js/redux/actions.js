
export const UpdateStock = (data) => ({
    type: "UPDATE_STOCK",
    symbol: data.symbol,
    timestamp: data.timestamp,
    price: data.stocks,
    volume: data.volume
})