import axios from "axios";

export default function ProductServices() {
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );

      return response;
    } catch (error) {
      return error;
    }
  };

  return { getProducts };
}
