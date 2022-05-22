import {useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    
    if (replace === true) {
      console.log(`Transition to ${newMode} by REPLACING ${mode}`);
      setMode(newMode)
      setHistory([...history, newMode])
    } else {
      setMode(newMode)
      setHistory([...history])
    }
  }

  function back() {
    const secLastIndex = history.length - 2;
    const setNewHistory = history.slice(0,-1)
    
    if (history.length >= 2) {
      setMode(history[secLastIndex]);
      setHistory(setNewHistory);
    }
  }
  
  return { mode, transition, back };
}

