import React, { useContext } from "react";
import {
  IoCloseOutline,
  IoBagHandleOutline,
  IoSadOutline,
} from "react-icons/io5";

import { BagContext } from "../../contexts/BagContext";

import SelectAmount from "../../components/SelectAmount";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  Container,
  BagEmpty,
  BagEmptyIcon,
  BagEmptyButton,
  Content,
  Table,
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
      {items.length < 1 ? (
        <BagEmpty>
          <BagEmptyIcon>
            <IoBagHandleOutline color="#bbb" size={116} />
          </BagEmptyIcon>

          <strong>
            Não há nada em sua sacola <IoSadOutline color="#555" size={28} />
          </strong>

          <a href="/#menu">
            <BagEmptyButton>Veja nosso cardápio!</BagEmptyButton>
          </a>
        </BagEmpty>
      ) : (
        <Content>
          <Table>
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
                      backgroundColor="#ededed"
                      onChangeAmount={changeItemAmount(item.title)}
                      amountValue={item.amount}
                    />
                  </TdAmount>
                  <TdPrice>
                    <strong>{item.formattedSubtotal}</strong>
                  </TdPrice>
                  <TdDelete>
                    <IoCloseOutline
                      size={36}
                      color="#666"
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
      )}
    </Container>
  );
}

export default Bag;
