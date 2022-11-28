import "../styles/globals.css";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../components/loader/Loader";
import { Provider } from "react-redux";
import store from "../Redux/store";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <>
      <Provider store={store}>
        <Toaster />
        {router.pathname.includes("/admin") ? (
          <AdminLayout>
            {loading ? <Loader /> : <Component {...pageProps} />}
          </AdminLayout>
        ) : loading ? (
          <Loader />
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </>
  );
}

export default MyApp;
