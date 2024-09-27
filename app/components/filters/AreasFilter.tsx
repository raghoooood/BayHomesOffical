'use client'

import React from 'react'
import SearchContainer from '../search/SearchContainer'
import { useParams} from 'next/navigation';


const AreasFilter = () => {

    const { areaName } = useParams<{ areaName: string | string[] }>();

    // Handle case where areaName might be an array
    const areaNameStr = Array.isArray(areaName) ? areaName[0] : areaName || '';
    const decodedAreaName = decodeURIComponent(areaNameStr);
  return (
    <div>
      <SearchContainer areaName={decodedAreaName }/>
    </div>
  )
}

export default AreasFilter
