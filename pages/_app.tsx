import React from "react";
import { AppProps } from "next/app";
import Layout from "@components/Layout/Layout";
import "../styles/index.css";

import { LayoutProvider } from "state/LayoutContext";

// Dayjs
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
require("dayjs/locale/tr");
dayjs.locale("tr");
dayjs.extend(customParseFormat);

function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
}

export default App;
