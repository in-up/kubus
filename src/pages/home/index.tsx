// "use client";
import React, { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";
import Header from "../../layout/Header";
import TabArea from "./TabArea";
import { Button as CButton, Box, Flex, Text } from "@chakra-ui/react"; // Chakra UI에서 필요한 컴포넌트들을 import

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
    margin-top: 5.5rem;
  }
`;

const Button = styled(CButton)`
  background-color: #bee3f8;
  color: #315282;
  i {
    font-size: 1.25rem;
    margin: 0.5rem;
    font-weight: 600;
  }

  .refresh {
    margin-right: 0.5rem;
  }
`;

const App: React.FC = () => {
  const pageTitle = "쿠버스 KUBUS - 경기대학교 버스 정보 시스템";
  const [currentPage, setCurrentPage] = useState("tab1");
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="toppad">
        <Header></Header>
      </div>
      <TabArea />
      <Flex
        position="fixed"
        bottom="1.5rem"
        right="2rem"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Button
          size="lg"
          onClick={handleRefresh}
          borderRadius="full"
          mb={3}
          boxShadow="md"
        >
          <div className="refresh">
            <Text fontSize="sm" as="b">
              15초 후 업데이트
            </Text>
          </div>
          <i className="ri-reset-left-line"></i>
        </Button>
      </Flex>
    </Main>
  );
};

export default App;
