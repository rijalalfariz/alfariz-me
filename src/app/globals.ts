"use client"
import { useEffect } from "react";

const GlobalTS = () => {
  useEffect(() => {
    console.log('aaf', document.querySelectorAll('[class*=speed_]'))
    document.querySelectorAll('[class*=speed_]').forEach((el) => {
      el.addEventListener('click', () => {
        console.log('aad');
        const speedParam = [...Array.from(el.classList).findLast(v => v.startsWith('speed_'))?.split("_") || []];
        console.log('aae', speedParam);
        if (!speedParam) return;

        // Create object from [key, value, key2, value2, ...]
        const speedObj = speedParam.reduce((acc, curr, idx, arr) => {
          if (idx % 2 === 0 && arr[idx + 1] !== undefined) {
            acc[curr] = arr[idx + 1];
          }
          return acc;
        }, {} as Record<string, string>);

        console.log("speedObj", speedObj)
      });
    });
  }, [])

  return null;
};

export default GlobalTS;