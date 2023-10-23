export const formatPrice = (price: number) => {
    return parseFloat(
        (price - 0.01).toFixed(2)
      ).toLocaleString("en-US");
}