import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UnorderedList, Accordion, ListItem } from "@chakra-ui/react";
import supabase from "../../api/supabaseClient";
import Cookies from "js-cookie";
import BusItem from "./BusItem";

interface BusListProps {
  nodeNo?: number;
}

const BusList: React.FC<BusListProps> = ({ nodeNo = 0 }) => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<
    { routeNo: string; routeId: number }[]
  >([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data: routes, error } = await supabase
          .from("routes")
          .select("*");

        if (error) {
          console.error("Error fetching routes:", error);
          return;
        }

        const hiddenRoutes = Cookies.get("hiddenRoutes");
        const hiddenRouteList = hiddenRoutes ? JSON.parse(hiddenRoutes) : [];

        let shownRoutes = routes
          .filter(
            (route) => !hiddenRouteList.includes(route.route_no.toString())
          )
          .map((route) => ({
            routeNo: route.route_no.toString(),
            routeId: route.route_id,
          }));

        if (nodeNo !== 0) {
          shownRoutes = shownRoutes.filter((route) =>
            routes.some(
              (r) =>
                r.node_no === nodeNo &&
                r.route_no.toString() === route.routeNo &&
                r.route_id === route.routeId
            )
          );
        }

        setSelectedItems(shownRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [nodeNo]);

  return (
    <Accordion allowMultiple>
      {selectedItems.map((item) => (
        <BusItem
          key={item.routeId}
          routeNo={item.routeNo}
          routeId={item.routeId}
        />
      ))}
    </Accordion>
  );
};

export default BusList;
