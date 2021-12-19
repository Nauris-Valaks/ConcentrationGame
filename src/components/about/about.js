export default {
  name: 'ProductCard',
  props: ['product', 'loading'],
  data() {
    return {
    }
  },
  computed: {
    selectedProduct: {
      get: function () {
        return this.$store.getters['products/getSelectedProduct']
      },
      set: function (obj) {
        this.$store.commit('products/setSelectedProduct', obj)
      }
    },
    cartItems() {
      const cartItems = this.$store.getters['cart/getCart']
      if (cartItems.data != undefined) {
        return cartItems.data.products.length
      }
    }
  },
  methods: {
    discountPrice(price, discount) {
      let moneySaved = (discount / 100) * price
      let discountPrice = price - moneySaved
      return discountPrice.toFixed(2)
    },
    selectProduct(product) {
      this.selectedProduct = product
      this.$router.push('/products/' + product.id)
    },
    addToCart(product) {
      let cart = this.$store.getters['cart/getCart']
      let productToAdd = { id: null, quantity: null, price: null, discount: null, name: null }
      if (cart.data.products.length > 0) {
        let inCartIndex = cart.data.products.findIndex(c => c.id === product.id)
        if (inCartIndex === -1) {
          productToAdd = { id: product.id, quantity: 1, price: product.price, discount: product.discount, name: product.name }
          cart.data.products.push(productToAdd)
        } else {
          cart.data.products[inCartIndex].quantity += 1
        }
      } else {
        productToAdd = { id: product.id, quantity: 1, price: product.price, discount: product.discount, name: product.name }
        cart.data.products.push(productToAdd)
      }
      this.$store.dispatch('cart/updateCart', cart.data)
    }

  },
}