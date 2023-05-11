import React from 'react';
import { instance } from '../api';

const useApiHook = (url) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    instance.get(url).then((response) => {
      setData(response.data);
    });
  }, [url]);
  return { data };
};

export default useApiHook;
