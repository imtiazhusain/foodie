const getTotalCartAmount = (food_list, cartItems) => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = food_list.find((product) => product._id == item);
      totalAmount += itemInfo.price * cartItems[item];
    }
  }
  return totalAmount;
};

export default getTotalCartAmount;
