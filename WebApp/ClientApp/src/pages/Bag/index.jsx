import React from "react";
import { IoTrashOutline } from "react-icons/io5";

import SelectAmount from "../../components/SelectAmount";

import burgerImg from "../../assets/images/burger-illustration.png";

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
            {[1, 2, 3].map(_ => (
              <tr>
                <TdImage>
                  <img src={burgerImg} alt="" />
                </TdImage>
                <TdProduct>
                  <div>
                    <span>Cheese burger</span>
                    <strong>R$ 16.90</strong>
                  </div>
                </TdProduct>
                <TdAmount>
                  <SelectAmount backgroundColor="#FCD757" />
                </TdAmount>
                <TdPrice>
                  <strong>R$ 33.80</strong>
                </TdPrice>
                <TdDelete>
                  <IoTrashOutline size={28} color="#FCD757" />
                </TdDelete>
              </tr>
            ))}
          </tbody>
        </Table>

        <OrderInfo>
          <CompleteOrder>Finalizar pedido</CompleteOrder>
          <OrderPrice>
            Total <strong>R$ 54.7</strong>
          </OrderPrice>
        </OrderInfo>
      </Content>
    </Container>
  );
}

export default Bag;
