import React from "react";
import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";

import SelectAmount from "../SelectAmount";
import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  Container,
  Content,
  Table,
  TdImage,
  TdProduct,
  TdAmount,
  TdPrice,
  TdDelete,
} from "./styles";

function imageFallback(e) {
  e.target.src = burgerFallbackImg;
}

const ProductsTable = {
  Container({ children }) {
    return <Container>{children}</Container>;
  },
  Content({ children }) {
    return <Content>{children}</Content>;
  },
  Table({ children }) {
    return (
      <Table>
        <tbody>{children}</tbody>
      </Table>
    );
  },
  Row({ children, ...rest }) {
    return <tr {...rest}>{children}</tr>;
  },
  Image({ src, alt }) {
    return (
      <TdImage>
        <img src={src} alt={alt} onError={imageFallback} />
      </TdImage>
    );
  },
  Info({ title, price }) {
    return (
      <TdProduct>
        <div>
          <span>{title}</span>
          <strong>{price}</strong>
        </div>
      </TdProduct>
    );
  },
  Amount({ onChangeAmount, amountValue }) {
    return (
      <TdAmount>
        <SelectAmount
          backgroundColor="#ededed"
          onChangeAmount={onChangeAmount}
          amountValue={amountValue}
        />
      </TdAmount>
    );
  },
  Subtotal({ subtotal }) {
    return (
      <TdPrice>
        <strong>{subtotal}</strong>
      </TdPrice>
    );
  },
  Delete({ onClick }) {
    return (
      <TdDelete>
        <IoCloseOutline size={36} color="#666" onClick={onClick} />
      </TdDelete>
    );
  },
};

ProductsTable.Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ProductsTable.Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ProductsTable.Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ProductsTable.Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ProductsTable.Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

ProductsTable.Info.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

ProductsTable.Amount.propTypes = {
  onChangeAmount: PropTypes.func.isRequired,
  amountValue: PropTypes.number.isRequired,
};

ProductsTable.Subtotal.propTypes = {
  subtotal: PropTypes.string.isRequired,
};

ProductsTable.Delete.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ProductsTable;
