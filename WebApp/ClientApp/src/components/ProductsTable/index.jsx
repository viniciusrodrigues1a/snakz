import React from "react";
import PropTypes from "prop-types";

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
  TdAction,
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
  Description({ description }) {
    return (
      <td>
        <span>{description}</span>
      </td>
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
  Action({ icon: Icon }) {
    return <TdAction>{Icon && <Icon />}</TdAction>;
  },
};

const childrenPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Object.assign(ProductsTable.Container, childrenPropTypes);
Object.assign(ProductsTable.Content, childrenPropTypes);
Object.assign(ProductsTable.Table, childrenPropTypes);
Object.assign(ProductsTable.Row, childrenPropTypes);

ProductsTable.Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

ProductsTable.Info.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

ProductsTable.Description.propTypes = {
  description: PropTypes.string.isRequired,
};

ProductsTable.Amount.propTypes = {
  onChangeAmount: PropTypes.func.isRequired,
  amountValue: PropTypes.number.isRequired,
};

ProductsTable.Subtotal.propTypes = {
  subtotal: PropTypes.string.isRequired,
};

ProductsTable.Action.propTypes = {
  icon: PropTypes.func,
};

ProductsTable.Action.defaultProps = {
  icon: null,
};

export default ProductsTable;
