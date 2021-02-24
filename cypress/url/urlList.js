export const urlList = {
  apiUri: Cypress.env("API_URI"),
  channels: "channels/",
  configuration: "configuration/",
  homePage: "/",
  orders: "orders/",
  products: "products/",
  warehouses: "warehouses/",
  sales: "discounts/sales/"
};
export const productDetailsUrl = productId => `${urlList.products}${productId}`;
