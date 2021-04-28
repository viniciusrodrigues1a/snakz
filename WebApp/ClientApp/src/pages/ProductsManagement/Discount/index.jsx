import React, { useState, useRef, useEffect } from "react";
import {
  IoEllipsisVertical,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { Container, OriginalPrice, Actions, CurrentPrice } from "./styles";

function Discount({ originalPrice, currentPrice, onUpdate, onDelete }) {
  const [shown, setShown] = useState(false);
  const actionsRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    document
      .querySelector("body")
      .addEventListener("click", handleClickOutsideActions);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", handleClickOutsideActions);
    };
  });

  function handleClickOutsideActions(e) {
    if (e.target === svgRef.current) {
      return;
    }

    if (e.target !== actionsRef.current) {
      if (shown) {
        setShown(false);
      }
    }
  }

  return (
    <Container>
      <div>
        {currentPrice && (
          <OriginalPrice>
            {originalPrice}
            <button
              ref={svgRef}
              onClick={() => {
                setShown(!shown);
              }}
              type="button"
            >
              <IoEllipsisVertical size={16} color="var(--light)" />
            </button>
            <Actions shown={shown} ref={actionsRef}>
              <IoPencilOutline size={20} color="#666" onClick={onUpdate} />
              <IoTrashOutline size={20} color="#666" onClick={onDelete} />
            </Actions>
          </OriginalPrice>
        )}
        <CurrentPrice>{currentPrice || originalPrice}</CurrentPrice>
      </div>
    </Container>
  );
}

export default Discount;
