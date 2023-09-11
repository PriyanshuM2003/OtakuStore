import "../styles/globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [admin, setAdmin] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(35);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear;
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= myuser.expirationTimestamp) {
        logout();
        toast.error("Your session has expired. Please log in again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setUser({
          value: myuser.token,
          email: myuser.email,
          name: myuser.name,
          phone: myuser.phone,
        });
        const timeToExpiration = myuser.expirationTimestamp - currentTime;
        setTimeout(checkTokenExpiration, timeToExpiration * 1000);
      }
    }
    setKey(Math.random());
  }, [router.query]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(35);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= admin.expirationTimestamp) {
        adminLogout();
        toast.error("Your session has expired. Please log in again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setAdmin({
          value: admin.token,
          email: admin.email,
          name: admin.name,
          phone: admin.phone,
        });
        const timeToExpiration = admin.expirationTimestamp - currentTime;
        setTimeout(checkAdminTokenExpiration, timeToExpiration * 1000);
      }
    }
    setKey(Math.random());
  }, [router.query]);

  const checkTokenExpiration = () => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.expirationTimestamp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= myuser.expirationTimestamp) {
        logout();
      } else {
        const timeToExpiration = myuser.expirationTimestamp - currentTime;
        setTimeout(checkTokenExpiration, timeToExpiration * 1000);
      }
    }
  };
  const checkAdminTokenExpiration = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.expirationTimestamp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= admin.expirationTimestamp) {
        logout();
      } else {
        const timeToExpiration = admin.expirationTimestamp - currentTime;
        setTimeout(checkTokenExpiration, timeToExpiration * 1000);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    setKey(Math.random());
    toast.success("You are successfully logged out!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push("/");
      window.location.reload();
    }, 1000);
  };

  const adminLogout = () => {
    localStorage.removeItem("admin");
    setAdmin({ value: null });
    setKey(Math.random());
    toast.success("You are successfully logged out!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push("/");
      window.location.reload();
    }, 1000);
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT);
  };

  const addToCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;
    if (Object.keys(cart).length == 0) {
      setKey(Math.random());
    }
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    setCart(newCart);
    saveCart(newCart);
    if (localStorage.getItem("myuser")) {
      router.push("/mycart");
    } else {
      router.push("/login");
    }
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (
    itemCode,
    qty,
    price,
    name,
    size,
    variant,
    img,
    category
  ) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <>
      <LoadingBar
        color="#03cafc"
        waitingTime={500}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && (
        <Navbar
          user={user}
          admin={admin}
          logout={logout}
          adminLogout={adminLogout}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
