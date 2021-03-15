import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollIntoView({ scrollToId, children }) {
  const { hash } = useLocation();

  function scrollToElement() {
    if (!scrollToId) {
      return;
    }

    const id = `#${scrollToId}`;
    const hashMatchesId = hash === id;
    const element = document.querySelector(id);
    if (hashMatchesId && element) {
      element.scrollIntoView();
    }
  }

  useEffect(scrollToElement, [scrollToId, hash]);

  return children;
}

export default ScrollIntoView;
