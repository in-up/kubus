import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button, Modal, useDisclosure } from "@chakra-ui/react";
import { whiteA } from "@radix-ui/colors";
import ModalMenu from "./ModalMenu";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${whiteA.whiteA12};
  transition: background-color 0.3s ease;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding: 1.25rem 1rem;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-left: 0;

    @media screen and (max-width: 768px) {
      margin-left: 0.5rem;
    }

    .logo-text {
      margin-left: 1rem;
      font-size: 1.5rem;
      font-weight: 800;

      @media screen and (max-width: 768px) {
        font-size: 1.25rem;
      }
    }
  }

  i {
    font-size: 1.5rem;

    @media screen and (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

interface HeaderProps {
  headerText?: boolean;
}

const Header: React.FC<HeaderProps> = ({ headerText = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
    "inside" | "outside"
  >("inside");
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleLogoPush = () => {
    router.push("/");
  };

  return (
    <Container>
      <div className="logo">
        <Link href="/">
          <Image
            src={headerText ? "/logo.svg" : "/wordlogo.svg"}
            alt="Logo"
            width={headerText ? 22 : 80}
            height={headerText ? 22 : 60}
          />
        </Link>
        {headerText && <div className="logo-text">설정</div>}
      </div>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen} variant="ghost">
        <i className="ri-menu-fill"></i>
      </Button>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size={"sm"}
      >
        <ModalMenu></ModalMenu>
      </Modal>
    </Container>
  );
};

export default Header;
