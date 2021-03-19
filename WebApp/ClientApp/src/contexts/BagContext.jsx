import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import formatPrice from "../utils/formatPrice";

export const BagContext = createContext([]);

export function BagProvider({ children }) {
  const [formattedTotal, setFormattedTotal] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length > 1) {
      const total = items.reduce(
        (acc, curr) => acc.price * acc.amount + curr.price * curr.amount
      );
      setFormattedTotal(formatPrice(total));
    } else if (items.length === 1) {
      setFormattedTotal(items[0].formattedSubtotal);
    } else {
      setFormattedTotal(formatPrice(0));
    }
  }, [items]);

  function addItemToBag(item) {
    setItems([...items, item]);
  }

  function removeItemFromBag(title) {
    const newItems = items.filter(i => i.title !== title);
    setItems(newItems);
  }

  function changeItemAmount(title) {
    return amount => {
      const newItems = items.map(item => {
        const newAmount = item.amount + amount;
        if (newAmount < 1) {
          return item;
        }

        if (item.title === title) {
          return {
            ...item,
            amount: newAmount,
            formattedSubtotal: formatPrice(item.price * newAmount),
          };
        }

        return item;
      });
      setItems(newItems);
    };
  }

  return (
    <BagContext.Provider
      value={{
        items,
        addItemToBag,
        removeItemFromBag,
        changeItemAmount,
        formattedTotal,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

BagProvider.propTypes = {
  children: PropTypes.element.isRequired,
};