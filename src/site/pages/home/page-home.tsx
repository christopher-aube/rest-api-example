import React, { useState, useEffect } from 'react';

export const Path = '/home';

export const Page = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoading || isReady) {
      return;
    }

    fetch('http://localhost:5003/api/v1/employees')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsReady(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Failed to get data', e);
      })

    return () => {
      setIsLoading(true);
    }
  }, [isLoading, isReady])

  return (
    <main>
      <div>Home Page</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
};

export default {
  Path,
  Page,
}