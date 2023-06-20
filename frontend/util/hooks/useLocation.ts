import { useEffect, useState } from "react";
import { ILocationHookResponse, ILocationResponse } from "@/util/interfaces/interfaces";

export const useLocation = (input: string, country:string) => {
  const [locations, setLocations] = useState<Array<ILocationHookResponse>>([])
  const [value, setValue] = useState<string>('')

  useEffect(()=>{
    const timer = setTimeout(() => {
      setValue(input)
    }, 1000)

    return () => {
      clearTimeout((timer))
    }
  }, [input])

  useEffect(() => {
    if(value){
      fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=json&limit=5&addressdetails=1&countrycodes=${country}`).then((response) => {
        if(!response.ok){
          throw new Error()
        } else {
          return response.json()
        }
      }).then((data:Array<ILocationResponse>) => {
        const formattedData = formatData(data)
        setLocations(formattedData)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [value, country])
  return locations
}

const formatData = (data: Array<ILocationResponse>): Array<ILocationHookResponse> => {
  const newData:Array<ILocationHookResponse> = []
  for(let i = 0; i < data.length; i++){
    newData.push({id: data[i].place_id, city: data[i].address.city, state: data[i].address.state})
  }
  return newData
}