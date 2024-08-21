import React from 'react'
import useFetch from './useFetch'

function Example() {
    const {data} = useFetch(3,4)
  return (
    <div>
        <p>{data}</p>
    </div>
  )
}

export default Example;
