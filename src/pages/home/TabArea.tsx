import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { slate, blackA, whiteA } from "@radix-ui/colors";
import BusList from "./BusList";

const Container = styled.div`
  margin: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const TabArea: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0); // 선택된 탭 번호 상태

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Container>
      <Tabs
        isFitted
        variant="soft-rounded"
        index={selectedTab}
        onChange={handleTabChange}
      >
        <TabList mb="1em">
          <Tab onClick={() => handleTabChange(0)}>경기대 정문</Tab>
          <Tab onClick={() => handleTabChange(1)}>광교산입구</Tab>
          <Tab isDisabled>경기대 후문</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BusList nodeNo={selectedTab === 0 ? 1 : 0} />{" "}
            {/* 첫 번째 탭에서는 nodeNo로 1을 전달 */}
          </TabPanel>
          <TabPanel>
            <BusList nodeNo={selectedTab === 1 ? 2 : 0} />{" "}
            {/* 두 번째 탭에서는 nodeNo로 2를 전달 */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default TabArea;
