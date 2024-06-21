import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { slate, blackA, whiteA } from "@radix-ui/colors";
import BusList from "@/layout/BusList";

const Container = styled.div`
  margin: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const TabArea: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <Tabs isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>경기대 정문</Tab>
          <Tab>광교산입구</Tab>
          <Tab isDisabled>경기대 후문</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BusList />
          </TabPanel>
          <TabPanel>
            <BusList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default TabArea;
