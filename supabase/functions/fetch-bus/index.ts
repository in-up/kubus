import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { format } from "https://deno.land/std@0.182.0/datetime/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const API_URL_35 =
  "https://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=GO3svuHSZvTjqLvHZZuR6rwyejlkFxa4HXcCeQmJt0izZxMLCc%2Bcg4QXrkMG7zwjgMhtCuqPh12%2BgslQVY3nNg%3D%3D&pageNo=1&numOfRows=100&_type=json&cityCode=31010&routeId=GGB200000148";
const API_URL_37 =
  "https://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=GO3svuHSZvTjqLvHZZuR6rwyejlkFxa4HXcCeQmJt0izZxMLCc%2Bcg4QXrkMG7zwjgMhtCuqPh12%2BgslQVY3nNg%3D%3D&pageNo=1&numOfRows=100&_type=json&cityCode=31010&routeId=GGB200000099";

interface BusItem {
  gpslati: number;
  gpslong: number;
  nodeid: string;
  nodenm: string;
  nodeord: number;
  routenm: number;
  routetp: string;
  vehicleno: string;
}

interface ApiResponse {
  response: {
    body: {
      items: {
        item: BusItem[];
      };
    };
  };
}

async function fetchBusData(apiUrl: string): Promise<BusItem[]> {
  console.log(`Fetching bus data from: ${apiUrl}`); // 디버그 로그 추가
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(
        `API call failed with status: ${response.status} ${response.statusText}`,
      );
      throw new Error(
        `API call failed: ${response.status} ${response.statusText}`,
      );
    }
    const data: ApiResponse = await response.json();
    console.log(`Fetched data: ${JSON.stringify(data)}`); // 데이터 로그 추가
    return data.response.body.items.item;
  } catch (error) {
    console.error(`Error in fetchBusData: ${error}`); // 오류 로그 추가
    throw error;
  }
}

async function getLatestPlateNo(routeId: string): Promise<string | null> {
  console.log(`Fetching latest plate number for routeId: ${routeId}`); // 디버그 로그 추가
  try {
    const { data, error } = await supabase
      .from("arrdata")
      .select("plate_no")
      .eq("route_id", routeId)
      .order("arr_time", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error(`Error fetching latest plate number: ${error.message}`); // 오류 로그 추가
      return null;
    }

    console.log(`Latest plate number: ${data?.plate_no}`); // 데이터 로그 추가
    return data ? data.plate_no : null;
  } catch (error) {
    console.error(`Error in getLatestPlateNo: ${error}`); // 오류 로그 추가
    throw error;
  }
}

async function saveBusData(routeId: string, busItem: BusItem) {
  console.log(
    `Saving bus data for routeId: ${routeId}, vehicleNo: ${busItem.vehicleno}`,
  ); // 디버그 로그 추가
  try {
    const { error } = await supabase.from("arrdata").insert([
      {
        route_id: routeId,
        arr_time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        plate_no: busItem.vehicleno,
        is_rh: false,
        is_wd: false,
      },
    ]);

    if (error) {
      console.error(`Error saving bus data: ${error.message}`); // 오류 로그 추가
    } else {
      console.log("Bus data saved successfully"); // 성공 로그 추가
    }
  } catch (error) {
    console.error(`Error in saveBusData: ${error}`); // 오류 로그 추가
    throw error;
  }
}

async function updateBusData(apiUrl: string, routeId: string) {
  console.log(`Updating bus data for routeId: ${routeId}`); // 디버그 로그 추가
  try {
    const busData = await fetchBusData(apiUrl);
    if (!busData.length) {
      console.error("No bus data found"); // 오류 로그 추가
      return;
    }

    const latestBus = busData.reduce((
      prev,
      curr,
    ) => (prev.nodeord < curr.nodeord ? prev : curr));
    const latestPlateNo = await getLatestPlateNo(routeId);

    if (latestPlateNo !== latestBus.vehicleno) {
      await saveBusData(routeId, latestBus);
    } else {
      console.log("No new bus data to save"); // 업데이트 필요 없음 로그 추가
    }
  } catch (error) {
    console.error(`Error updating bus data: ${error}`); // 오류 로그 추가
    throw error;
  }
}

serve(async (req: Request) => {
  console.log("Request received"); // 디버그 로그 추가

  // CORS 헤더 설정
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  // OPTIONS 메소드 요청에 대한 응답 처리
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    await updateBusData(API_URL_35, "GGB200000148");
    await updateBusData(API_URL_37, "GGB200000099");
    return new Response("Bus data updated successfully", {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Error in main handler: ${error}`); // 오류 로그 추가
    return new Response("Failed to update bus data", { status: 500, headers });
  }
});
