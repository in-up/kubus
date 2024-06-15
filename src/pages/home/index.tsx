import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const App: React.FC = () => {
  const pageTitle = "Test";
  const [currentPage, setCurrentPage] = useState("tab1");
  const router = useRouter();

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      Initial Build
    </Main>
  );
};

export default App;
