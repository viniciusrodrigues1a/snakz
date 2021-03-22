import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoRemove, IoAdd } from "react-icons/io5";

import { Container, Button, Amount } from "./styles";

function SelectAmount({ onChangeAmount, backgroundColor, amountValue }) {
  const [amount, setAmount] = useState(amountValue ?? 1);

  function changeAmount(a) {
    const amountIsValid = !(amount + a < 1);
    if (amountIsValid) {
      setAmount(amount + a);
    }
    onChangeAmount(a);
  }

  return (
    <Container backgroundColor={backgroundColor}>
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
  backgroundColor: PropTypes.string,
  amountValue: PropTypes.number,
};

SelectAmount.defaultProps = {
  backgroundColor: "#fff",
  amountValue: 1,
};

export default SelectAmount;
