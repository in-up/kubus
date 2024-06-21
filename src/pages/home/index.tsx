"use client";
import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";
import Header from "./Header";
import TabArea from "./TabArea";

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  background-position: center;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;

  .toppad {
    margin-top: 4.5rem;
  }
`;

const Useless = styled.div`
  margin: 3rem;
`;

const App: React.FC = () => {
  const pageTitle = "쿠버스 KUBUS - 경기대학교 버스 정보 시스템";
  const [currentPage, setCurrentPage] = useState("tab1");
  const router = useRouter();

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="toppad">
        <Header></Header>
      </div>
      <TabArea></TabArea>
    </Main>
  );
};

export default App;
