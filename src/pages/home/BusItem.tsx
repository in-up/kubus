import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AccordionItem as CAccordionItem,
  AccordionButton as CAccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import styled from "styled-components";
import supabase from "../../api/supabaseClient";

interface BusItemProps {
  routeNo: string;
  routeId: number;
}

const Container = styled.div`
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
    "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
`;

const AccordionButton = styled(CAccordionButton)`
  outline: 0px;
  border-radius: 20px;
  margin: 0.5rem 0;

  .ri-bus-2-fill {
    font-size: 1.25rem;
    margin-right: 1rem;
    color: #18ae63;
  }
`;

const AccordionItem = styled(CAccordionItem)`
  outline: 0px;
  /* border: 0px; */
  border-top: 0px;
  border-color: #f9fafc;
`;

const BusItem: React.FC<BusItemProps> = ({ routeNo, routeId }) => {
  const router = useRouter();
  const [startNodeNm, setStartNodeNm] = useState<string>("");
  const [endNodeNm, setEndNodeNm] = useState<string>("");

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const { data: routeDetails, error } = await supabase
          .from("routes")
          .select("start_node_nm, end_node_nm")
          .eq("route_id", routeId)
          .single();

        if (error) {
          console.error("Error fetching route details:", error);
          return;
        }

        setStartNodeNm(routeDetails.start_node_nm);
        setEndNodeNm(routeDetails.end_node_nm);
      } catch (error) {
        console.error("Error fetching route details:", error);
      }
    };

    fetchRouteDetails();
  }, [routeId]);

  return (
    <Container>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Flex direction="row" align="center">
                <i className="ri-bus-2-fill"></i>
                <Flex direction="column" align="start">
                  <Text as="b" fontSize="lg" color="black">
                    {routeNo}
                  </Text>
                  <Text fontSize="xs" color="gray">
                    {startNodeNm} - {endNodeNm}
                  </Text>
                </Flex>
              </Flex>
              <Spacer />
              {isExpanded ? (
                <i className="ri-arrow-up-s-line"></i>
              ) : (
                <Text fontSize="sm">0분 0초</Text>
              )}
            </AccordionButton>
            <AccordionPanel pb={4}>
              <p>Route ID: {routeId}</p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Container>
  );
};

export default BusItem;
