import React, { useState, useEffect } from 'react';

function useFetch(num1, num2) {
    const [data, setData] = useState(null);
  useEffect(function(){
    setData(num1 * num2);
  },[num1, num2])
    return { data };
}

export default useFetch;

