import { useState } from "react";

export default function useLoadMore(initialAmount = 6) {
  const [loadAmount, setLoadAmount] = useState(initialAmount);

  function loadMore() {
    setLoadAmount((prev) => prev + initialAmount);
  }

  return {
    loadAmount,
    loadMore,
  };
}
