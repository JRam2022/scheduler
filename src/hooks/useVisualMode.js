import {useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // transitions to new state and updates history
  function transition(newMode, replace = false) {
    
    // replaces history with the newest state 
    if (replace === true) {
      setMode(newMode)
      setHistory([...history.slice(0, -1), newMode]);
    } else {
      setMode(newMode)
      setHistory([...history, newMode]);
    }
  }

  // goes back to previous history
  function back() {
    const secLastIndex = history.length - 2;
    const setNewHistory = history.slice(0,-1);
    
    // if history only contains one state it will not revert to empty state
    if (history.length >= 2) {
      setMode(history[secLastIndex]);
      setHistory(setNewHistory);
    }
  }
  
  return { mode, transition, back };
}

