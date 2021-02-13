import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState((preState) => ({ data: preState.data, loading: true }));
    axios.get(url)
      .then((y) => {
        if (isCurrent.current) {
          setState({ data: y.data, loading: false });
        }
      });
  }, [url, setState]);

  // useEffect(() => {
  //   const myInit = {
  //     method: 'GET',
  //     mode: 'no-cors',
  //   };
  //   const myRequest = new Request(url, myInit);
  //   // console.log("isCurrent", isCurrent, url);
  //   setState((preState) => ({ data: preState.data, loading: true }));
  //   fetch(myRequest).then((x) => x.json())
  //     .then((y) => {
  //       if (isCurrent.current) {
  //         setState({ data: y, loading: false });
  //       }
  //     });
  // }, [url, setState]);

  return state;
};
