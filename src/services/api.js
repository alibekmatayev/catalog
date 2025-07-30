export async function getProducts() {
  return [
    {
      id: 1,
      name: "Nike Air Max",
      price: 150,
      category: "Кроссовки",
      image: "/nike.jpg",
    },
    {
      id: 2,
      name: "Adidas Yeezy",
      price: 200,
      category: "Кроссовки",
      image: "/yeezy.jpg",
    },
    {
      id: 3,
      name: "T-shirt",
      price: 50,
      category: "Футболки",
      image: "/shirt.jpg",
    },
    {
      id: 4,
      name: "Puma RS-X",
      price: 120,
      category: "Кроссовки",
      image: "/puma.jpg",
    },
  ];
}
