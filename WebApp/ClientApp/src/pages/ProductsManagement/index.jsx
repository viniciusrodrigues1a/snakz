import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import {
  IoFastFoodOutline,
  IoPencil,
  IoTrashOutline,
  IoPricetagOutline,
  IoAddOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

import { fetchProducts } from "../../utils/fetchProducts";
import imageFallback from "../../utils/imageFallback";
import { UserContext } from "../../contexts/UserContext";

import ProductsTable from "../../components/ProductsTable";
import LoadingSpin from "../../components/LoadingSpin";
import EmptyList from "../../components/EmptyList";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import Discount from "./Discount";

import { AddProduct } from "./styles";

function ProductsManagement() {
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({
    shown: false,
    title: "",
    children: null,
    onConfirm: () => {},
  });
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const imageRef = useRef(null);
  const discountAmountInputRef = useRef(null);

  const makeAPICall = useCallback(async () => {
    setLoaded(false);
    const response = await fetchProducts();
    setProducts(response);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/admin");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    (async () => makeAPICall())();
  }, [makeAPICall]);

  async function deleteProduct(id) {
    const response = await fetch(`/products/${id}`, {
      method: "delete",
    });

    throwErrorIfStatusIsInvalid(response.status.toString());
  }

  async function createProduct() {
    const body = createProductFormData();
    const response = await fetch("/products", {
      method: "post",
      body,
    });

    throwErrorIfStatusIsInvalid(response.status.toString());
  }

  async function updateProduct(productId) {
    const body = createProductFormData();
    const response = await fetch(`/products/${productId}`, {
      method: "put",
      body,
    });

    throwErrorIfStatusIsInvalid(response.status.toString());
  }

  function createProductFormData() {
    const formData = new FormData();
    formData.append("title", titleInputRef.current.value);
    formData.append("price", priceInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    const [file] = imageInputRef.current.files;
    formData.append("file", file);

    return formData;
  }

  async function deleteDiscount(discountId) {
    const response = await fetch(`/discounts/${discountId}`, {
      method: "delete",
    });

    throwErrorIfStatusIsInvalid(response.status.toString());
  }

  async function createDiscount(productId) {
    const body = createDiscountBody(productId);
    const response = await fetch("/discounts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });

    throwErrorIfStatusIsInvalid(response.status.toString());
  }

  async function updateDiscount(discountId) {
    const body = createDiscountBody();
    const response = await fetch(`/discounts/${discountId}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });

    throwErrorIfStatusIsInvalid(response.status.toString());
  }

  function createDiscountBody(productId = undefined) {
    return JSON.stringify({
      amount: Number(discountAmountInputRef.current.value),
      productId,
    });
  }

  function throwErrorIfStatusIsInvalid(status) {
    const is2xxStatus = status.startsWith("2");
    if (!is2xxStatus) {
      throw new Error(`Received a response status of ${status}`);
    }
  }

  function findFormattedIndexOfProduct(product) {
    return products.indexOf(product) + 1;
  }

  function showToastError(title) {
    toast.error(title, {
      style: {
        background: "#a24e4e",
      },
    });
  }

  async function handleModalConfirmation(onConfirmCallback) {
    try {
      await onConfirmCallback();
      await makeAPICall();
    } catch (_) {
      showToastError("Ocorreu um erro!");
    }
  }

  return (
    <ProductsTable.Container>
      <ProductsTable.Content>
        {!loaded ? (
          <LoadingSpin />
        ) : loaded && products.length === 0 ? (
          <EmptyList
            icon={() => <IoFastFoodOutline color="#bbb" size={116} />}
            message="Não há nada aqui"
          />
        ) : (
          <ProductsTable.Table>
            {products.map(product => (
              <ProductsTable.Row key={String(product.id)}>
                <ProductsTable.Image
                  src={product.imageUrl}
                  onError={imageFallback}
                  alt={product.title}
                />
                <ProductsTable.Info
                  title={product.title}
                  price={
                    product.formattedDiscountPrice
                      ? product.formattedDiscountPrice
                      : product.formattedPrice
                  }
                />
                <ProductsTable.Description description={product.description} />
                <Discount
                  currentPrice={product.formattedDiscountPrice}
                  originalPrice={product.formattedPrice}
                  onUpdate={() => {
                    setModal({
                      shown: true,
                      product,
                      title: `Atualizando desconto do produto #${findFormattedIndexOfProduct(
                        product
                      )}`,
                      onConfirm: () => updateDiscount(product.discountId),

                      children: (
                        <ModalContent.Discount
                          discountAmountInputRef={discountAmountInputRef}
                        />
                      ),
                    });
                  }}
                  onDelete={() => {
                    setModal({
                      shown: true,
                      title: `Deletando desconto do produto #${findFormattedIndexOfProduct(
                        product
                      )}`,
                      onConfirm: () => deleteDiscount(product.discountId),
                    });
                  }}
                />
                <ProductsTable.Action
                  icon={
                    !product.formattedDiscountPrice
                      ? () => (
                          <IoPricetagOutline
                            size={36}
                            color="#666"
                            onClick={() => {
                              setModal({
                                shown: true,
                                product,
                                title: `Criando desconto para o produto #${findFormattedIndexOfProduct(
                                  product
                                )}`,
                                onConfirm: () => createDiscount(product.id),
                                children: (
                                  <ModalContent.Discount
                                    discountAmountInputRef={
                                      discountAmountInputRef
                                    }
                                  />
                                ),
                              });
                            }}
                          />
                        )
                      : null
                  }
                />
                <ProductsTable.Action
                  icon={() => (
                    <IoPencil
                      size={36}
                      color="#666"
                      onClick={() =>
                        setModal({
                          shown: true,
                          title: `Atualizando produto #${findFormattedIndexOfProduct(
                            product
                          )}`,
                          children: (
                            <ModalContent.Product
                              imageInputRef={imageInputRef}
                              imageRef={imageRef}
                              titleInputRef={titleInputRef}
                              priceInputRef={priceInputRef}
                              descriptionInputRef={descriptionInputRef}
                              product={product}
                            />
                          ),
                          onConfirm: () => updateProduct(product.id),
                        })
                      }
                    />
                  )}
                />
                <ProductsTable.Action
                  icon={() => (
                    <IoTrashOutline
                      size={36}
                      color="#666"
                      onClick={() =>
                        setModal({
                          shown: true,
                          title: `Certeza que deseja excluir o item #${findFormattedIndexOfProduct(
                            product
                          )}?`,
                          onConfirm: () => deleteProduct(product.id),
                        })
                      }
                    />
                  )}
                />
              </ProductsTable.Row>
            ))}
          </ProductsTable.Table>
        )}

        <AddProduct>
          <button
            type="button"
            onClick={() =>
              setModal({
                shown: true,
                title: "Criando novo produto",
                children: (
                  <ModalContent.Product
                    imageInputRef={imageInputRef}
                    imageRef={imageRef}
                    titleInputRef={titleInputRef}
                    priceInputRef={priceInputRef}
                    descriptionInputRef={descriptionInputRef}
                  />
                ),
                onConfirm: () => createProduct(),
              })
            }
          >
            <IoAddOutline size={32} color="#eee" />
          </button>
        </AddProduct>
      </ProductsTable.Content>

      <Modal
        isOpen={modal.shown}
        onCancel={() => {
          setModal({ shown: false });
        }}
        onConfirm={() => {
          handleModalConfirmation(modal.onConfirm);
        }}
        title={modal.title}
      >
        {modal.children}
      </Modal>
    </ProductsTable.Container>
  );
}

export default ProductsManagement;
