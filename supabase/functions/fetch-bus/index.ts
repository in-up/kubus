import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { format } from "https://deno.land/std@0.182.0/datetime/mod.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') as string;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const API_URL_35 = "https://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=GO3svuHSZvTjqLvHZZuR6rwyejlkFxa4HXcCeQmJt0izZxMLCc%2Bcg4QXrkMG7zwjgMhtCuqPh12%2BgslQVY3nNg%3D%3D&pageNo=1&numOfRows=100&_type=json&cityCode=31010&routeId=GGB200000148";
const API_URL_37 = "https://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=GO3svuHSZvTjqLvHZZuR6rwyejlkFxa4HXcCeQmJt0izZxMLCc%2Bcg4QXrkMG7zwjgMhtCuqPh12%2BgslQVY3nNg%3D%3D&pageNo=1&numOfRows=100&_type=json&cityCode=31010&routeId=GGB200000099";

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
  const response = await fetch(apiUrl);
  const data: ApiResponse = await response.json();
  return data.response.body.items.item;
}

async function getLatestPlateNo(routeId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('arrdata')
    .select('plate_no')
    .eq('route_id', routeId)
    .order('arr_time', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching latest plate number:', error);
    return null;
  }

  return data ? data.plate_no : null;
}

async function saveBusData(routeId: string, busItem: BusItem) {
  const { error } = await supabase.from('arrdata').insert([
    {
      route_id: routeId,
      arr_time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      plate_no: busItem.vehicleno,
      is_rh: false,
      is_wd: false
    }
  ]);

  if (error) {
    console.error('Error saving bus data:', error);
  }
}

async function updateBusData(apiUrl: string, routeId: string) {
  const busData = await fetchBusData(apiUrl);
  const latestBus = busData.reduce((prev, curr) => (prev.nodeord < curr.nodeord ? prev : curr));
  const latestPlateNo = await getLatestPlateNo(routeId);

  if (latestPlateNo !== latestBus.vehicleno) {
    await saveBusData(routeId, latestBus);
  }
}

serve(async (req: Request) => {
  try {
    await updateBusData(API_URL_35, 'GGB200000148');
    await updateBusData(API_URL_37, 'GGB200000099');
    return new Response('Bus data updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating bus data:', error);
    return new Response('Failed to update bus data', { status: 500 });
  }
});
