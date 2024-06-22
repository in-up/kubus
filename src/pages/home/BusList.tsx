import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UnorderedList, ListItem } from "@chakra-ui/react";
import supabase from "../../api/supabaseClient"; // supabase 클라이언트 가져오기
import Cookies from "js-cookie";

interface BusListProps {
  nodeNo?: number; // 파라미터로 전달될 정수형 값 (기본값: 0)
}

const BusList: React.FC<BusListProps> = ({ nodeNo = 0 }) => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // Supabase에서 모든 노선 가져오기
        const { data: routes, error } = await supabase
          .from("routes")
          .select("*");

        if (error) {
          console.error("Error fetching routes:", error);
          return;
        }

        // 쿠키에서 숨김 처리된 노선 가져오기
        const hiddenRoutes = Cookies.get("hiddenRoutes");
        const hiddenRouteList = hiddenRoutes ? JSON.parse(hiddenRoutes) : [];

        // 노선 필터링
        let shownRoutes = routes
          .filter(
            (route) => !hiddenRouteList.includes(route.route_no.toString())
          )
          .map((route) => route.route_no.toString());

        if (nodeNo !== 0) {
          shownRoutes = shownRoutes.filter((routeNo) =>
            routes.some(
              (route) =>
                route.node_no === nodeNo &&
                route.route_no.toString() === routeNo
            )
          );
        }

        setSelectedItems(shownRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [nodeNo]); // nodeNo가 변경될 때마다 실행

  return (
    <UnorderedList>
      {selectedItems.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </UnorderedList>
  );
};

export default BusList;
