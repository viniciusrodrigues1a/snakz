import React, { useContext } from "react";
import {
  IoCloseOutline,
  IoBagHandleOutline,
  IoSadOutline,
} from "react-icons/io5";

import { BagContext } from "../../contexts/BagContext";

import ProductsTable from "../../components/ProductsTable";

import {
  BagEmpty,
  BagEmptyIcon,
  BagEmptyButton,
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

  return (
    <ProductsTable.Container>
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
        <ProductsTable.Content>
          <ProductsTable.Table>
            {items.map(item => (
              <ProductsTable.Row key={item.title}>
                <ProductsTable.Image src={item.imageUrl} alt={item.title} />
                <ProductsTable.Info
                  title={item.title}
                  price={item.formattedPrice}
                />
                <ProductsTable.Amount
                  onChangeAmount={changeItemAmount(item.title)}
                  amountValue={item.amount}
                />
                <ProductsTable.Subtotal subtotal={item.formattedSubtotal} />
                <ProductsTable.Action
                  icon={() => (
                    <IoCloseOutline
                      size={36}
                      color="#666"
                      onClick={() => removeItemFromBag(item.title)}
                    />
                  )}
                />
              </ProductsTable.Row>
            ))}
          </ProductsTable.Table>

          <OrderInfo>
            <CompleteOrder
              onClick={() => {
                console.log(items);
              }}
            >
              Finalizar pedido
            </CompleteOrder>
            <OrderPrice>
              Total <strong>{formattedTotal}</strong>
            </OrderPrice>
          </OrderInfo>
        </ProductsTable.Content>
      )}
    </ProductsTable.Container>
  );
}

export default Bag;
