import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import "../components/ProductPage.css";
import TrendingSlider from "../components/TrendingSlider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import axios from 'axios'; // Import axios for making HTTP requests

function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [notify, setNotify] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with your own backend API endpoint that fetches the product data from MongoDB
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setItem(response.data);
        setImage(response.data.img);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  const changeImage = (e) => {
    setImage(e.target.src);
  };

  const increase = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calcPrice = (quantity) => {
    return quantity * item.price;
  };

  const showNotify = () => {
    setNotify(!notify);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        onAnimationEnd={() => setNotify(false)}
        className={`notify ${notify ? "slide-in" : ""}`}
      >
        <p>Item has been added to the cart &nbsp; ✅</p>
      </div>

      <div className="product-page-div">
        <div className="container">
          <div className="product-div">
            <h3 className="product-big-name">{item.description}</h3>
            <div className="product-left">
              <div className="big-img">
                <img src={image} alt="product" />
              </div>
              <div className="small-imgs">
                <img
                  onMouseOver={changeImage}
                  src={item.img}
                  alt="product"
                />
                {/* Add additional images here */}
              </div>
            </div>
            <div className="product-right">
              {/* Add product details here */}
            </div>
          </div>

          {/* Add additional product information here */}
        </div>
        <TrendingSlider />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
