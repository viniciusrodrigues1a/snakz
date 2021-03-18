import React, { useContext } from "react";
import { IoTrashOutline } from "react-icons/io5";

import { BagContext } from "../../contexts/BagContext";

import SelectAmount from "../../components/SelectAmount";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  Container,
  Content,
  Table,
  ThAmount,
  ThPrice,
  TdImage,
  TdProduct,
  TdAmount,
  TdPrice,
  TdDelete,
  OrderInfo,
  CompleteOrder,
  OrderPrice,
} from "./styles";

function Bag() {
  const {
    items,
    removeItemFromBag,
    changeItemAmount,
    formattedTotal,
  } = useContext(BagContext);

  function imageFallback(e) {
    e.target.src = burgerFallbackImg;
  }

  return (
    <Container>
      <Content>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Produto</th>
              <ThAmount>Quantidade</ThAmount>
              <ThPrice>Subtotal</ThPrice>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.title}>
                <TdImage>
                  <img src={item.imageUrl} alt="" onError={imageFallback} />
                </TdImage>
                <TdProduct>
                  <div>
                    <span>{item.title}</span>
                    <strong>{item.formattedPrice}</strong>
                  </div>
                </TdProduct>
                <TdAmount>
                  <SelectAmount
                    backgroundColor="#FCD757"
                    onChangeAmount={changeItemAmount(item.title)}
                  />
                </TdAmount>
                <TdPrice>
                  <strong>{item.formattedSubtotal}</strong>
                </TdPrice>
                <TdDelete>
                  <IoTrashOutline
                    size={28}
                    color="#FCD757"
                    onClick={() => removeItemFromBag(item.title)}
                  />
                </TdDelete>
              </tr>
            ))}
          </tbody>
        </Table>

        <OrderInfo>
          <CompleteOrder>Finalizar pedido</CompleteOrder>
          <OrderPrice>
            Total <strong>{formattedTotal}</strong>
          </OrderPrice>
        </OrderInfo>
      </Content>
    </Container>
  );
}

export default Bag;
