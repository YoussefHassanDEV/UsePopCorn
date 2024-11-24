import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inputEL = useRef(null);
  useEffect(function () {
    function callback(e) {
      if(document.activeElement===inputEL.current)
        return;
      if(e.code==='Enter'){
        inputEL.current.focus()
        setQuery("")
      }
    }
    document.addEventListener('keydown', callback)
    return () => document.addEventListener('keydown', callback)
  }, [setQuery])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEL} />
  );
}
