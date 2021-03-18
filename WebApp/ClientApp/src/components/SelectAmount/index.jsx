import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoRemove, IoAdd } from "react-icons/io5";

import { Container, Button, Amount } from "./styles";

function SelectAmount({ onChangeAmount }) {
  const [amount, setAmount] = useState(1);

  function changeAmount(a) {
    const amountIsValid = !(amount + a < 1);
    if (amountIsValid) {
      setAmount(amount + a);
    }
    onChangeAmount(a);
  }

  return (
    <Container>
      <Button disabled={amount === 1} onClick={() => changeAmount(-1)}>
        <IoRemove color="#777" size={26} />
      </Button>

      <Amount>{amount}</Amount>

      <Button onClick={() => changeAmount(+1)}>
        <IoAdd color="#777" size={26} />
      </Button>
    </Container>
  );
}

SelectAmount.propTypes = {
  onChangeAmount: PropTypes.func.isRequired,
};

export default SelectAmount;
