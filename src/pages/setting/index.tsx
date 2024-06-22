// "use client";
import React, { useRef, useState } from "react";
import Head from "next/head";
import styled from "styled-components";

import {
  Modal,
  useDisclosure,
  VStack,
  Box as CBox,
  Button as CButton,
  StackDivider,
  Text,
  Flex,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../../layout/Header";
import ChooseModal from "./ChooseModal";

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
    margin-top: 5rem;
  }
`;

const Box = styled(CBox)`
  margin: 0 1rem;
`;

const Button = styled(CButton)``;

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pageTitle = "쿠버스 KUBUS - 설정";
  const [currentPage, setCurrentPage] = useState("tab1");
  const router = useRouter();

  return (
    <Main>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="toppad">
        <Header headerText={true}></Header>
      </div>
      <VStack
        divider={<StackDivider borderColor="gray.100" />}
        spacing={5}
        align="stretch"
      >
        <Box>
          <Flex alignItems={"center"} margin={1}>
            <div>
              <Text fontSize="md" as="b">
                페이지 자동 새로고침
              </Text>
              <Text fontSize="sm">
                15초 간격으로 버스 정보를 업데이트합니다.
              </Text>
            </div>
            <Spacer />
            <Switch id="auto-refresh" size="lg" isDisabled defaultChecked />
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} margin={1}>
            <div>
              <Text fontSize="md" as="b">
                버스 목록 편집
              </Text>
              <Text fontSize="sm">메인 화면에 표시할 버스를 선택합니다.</Text>
            </div>
            <Spacer />
            <Button onClick={onOpen} size="sm">
              편집
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} size={"sm"}>
              <ChooseModal onClose={onClose} />
            </Modal>
          </Flex>
        </Box>
      </VStack>
    </Main>
  );
};

export default App;
