import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { slate, blackA, whiteA } from "@radix-ui/colors";

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
    margin-left: 0;
    @media screen and (max-width: 768px) {
      margin-left: 0.5rem;
    }
  }

  i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    @media screen and (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogoPush = () => {
    router.push("/");
  };

  return (
    <Container>
      <div className="logo">
        <Link href="/">
          <Image
            src="/wordlogo.svg"
            alt="Logo"
            width={80}
            height={60}
            layout="intrinsic"
          />
        </Link>
      </div>
      <i className="ri-menu-fill"></i>
    </Container>
  );
};

export default Header;
