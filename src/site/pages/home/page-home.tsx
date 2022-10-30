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

    fetch('http://localhost:5003/')
      .then((res) => { return res.json() })
      .then((data) => {
        setData(data);
        setIsReady(true);
        setIsLoading(false);
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