import React, {useState } from "react";

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);

  function transition(sec) {
    return setMode(sec)
  }

  return { mode, transition }
}

