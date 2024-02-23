const state = {
  products: [
    {
      name: "Fluffball",
      img: "http://placekitten.com/150/150?image=1",
      smallImg: "http://placekitten.com/50/50?image=1",
      price: 0.99,
      count: 0,
    },
    {
      name: "General Mayhem",
      img: "http://placekitten.com/150/150?image=2",
      smallImg: "http://placekitten.com/50/50?image=2",
      price: 3.14,
      count: 0,
    },
    {
      name: "Nyan Cat",
      img: "http://placekitten.com/150/150?image=3",
      smallImg: "http://placekitten.com/50/50?image=3",
      price: 2.73,
      count: 0,
    },
  ],

  viewCart: false,

  // 计算购物车中的总商品数量
  getCartCount: function() {
    return this.products.reduce((total, product) => total + product.count, 0);
  },

  // 获取指定索引商品的价格（考虑数量）
  getPricePerProduct: function(index) {
    const product = this.products[index];
    return (product.count * product.price).toFixed(2);
  },

  // 计算购物车中所有商品的总价格
  getTotalPrice: function() {
    return this.products
      .reduce((total, product) => total + product.count * product.price, 0)
      .toFixed(2);
  },
};

export default state;
