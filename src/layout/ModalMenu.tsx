import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  Button as ChakraButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { whiteA } from "@radix-ui/colors";

const Button = styled(ChakraButton)`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin: 0.25rem 0;

  i {
    font-size: 1.25rem;
    margin-right: 1rem;
  }
`;

const FooterButton = styled(ChakraButton)`
  i {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;

const Container = styled.div`
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const ModalMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleHomePush = () => {
    router.push("/");
  };
  const handleSettingPush = () => {
    router.push("/setting");
  };
  const handleOslPush = () => {
    router.push("/");
  };

  return (
    <Container>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>메뉴</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button onClick={handleHomePush} variant="ghost">
            <i className="ri-home-2-line"></i>홈
          </Button>
          <Button onClick={handleSettingPush} variant="ghost">
            <i className="ri-settings-3-line"></i>쿠버스 설정
          </Button>
          <Button onClick={handleOslPush} variant="ghost">
            <i className="ri-mail-line"></i>문의하기
          </Button>
        </ModalBody>
        <ModalFooter>
          <FooterButton onClick={handleOslPush}>
            <i className="ri-bar-chart-horizontal-line"></i>오픈소스 라이선스
          </FooterButton>
          {/* <FooterButton onClick={onClose}>닫기</FooterButton> */}
        </ModalFooter>
      </ModalContent>
    </Container>
  );
};

export default ModalMenu;
