import { useEffect, useState } from "react";
import { ILocationHookResponse, ILocationResponse } from "@/util/interfaces/interfaces";

export const useLocation = (input: string, country: string) => {
  const [locations, setLocations] = useState<Array<ILocationHookResponse>>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (input) {
      setSearching(true);
      timer = setTimeout(() => {
        searchLocations();
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const searchLocations = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${input}&format=json&limit=5&addressdetails=1&countrycodes=${country}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data: Array<ILocationResponse> = await response.json();
      const formattedData = formatData(data);
      setLocations(formattedData);
    } catch (err) {
      console.log(err);
    } finally {
      setSearching(false);
    }
  };

  return { searching, locations };
};

const formatData = (data: Array<ILocationResponse>): Array<ILocationHookResponse> => {
  const newData: Array<ILocationHookResponse> = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].address.city) {
      const existingCity = newData.some(
        (item) => item.city === data[i].address.city
      );
      if (!existingCity) {
        newData.push({
          id: data[i].place_id,
          city: data[i].address.city,
          state: data[i].address.state,
        });
      }
    }
  }
  return newData;
};