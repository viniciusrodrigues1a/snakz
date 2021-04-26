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
  IoCloudUploadOutline,
  IoAddOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

import { fetchProducts } from "../../utils/fetchProducts";
import { UserContext } from "../../contexts/UserContext";

import ProductsTable from "../../components/ProductsTable";
import LoadingSpin from "../../components/LoadingSpin";
import EmptyList from "../../components/EmptyList";
import Modal from "./Modal";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import { AddProduct, ProductForm, ProductFormUpload } from "./styles";

function ProductsManagement() {
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletionModal, setDeletionModal] = useState({
    shown: false,
  });
  const [productModal, setProductModal] = useState({
    shown: false,
  });
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const imageRef = useRef(null);

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

    if (response.status !== 200) {
      toast.error("Algo deu errado ao deletar item!", {
        style: {
          background: "#a24e4e",
        },
      });
      return;
    }

    await makeAPICall();
  }

  async function handleModal() {
    const formData = createFormData();
    const isCreatingProduct = !productModal.product;

    function errCallback(e) {
      console.log(e);
      toast.error(
        `Algo deu errado ao ${isCreatingProduct ? "criar" : "atualizar"} item!`,
        {
          style: {
            background: "#a24e4e",
          },
        }
      );
    }

    if (isCreatingProduct) {
      await makePostRequest(formData, errCallback);
    } else {
      await makePutRequest(formData, errCallback);
    }

    await makeAPICall();
  }

  function createFormData() {
    const formData = new FormData();
    formData.append("title", titleInputRef.current.value);
    formData.append("price", priceInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    const [file] = imageInputRef.current.files;
    formData.append("file", file);

    return formData;
  }

  async function makePostRequest(formData, errCallback) {
    try {
      const response = await fetch("/products", {
        method: "post",
        body: formData,
      });

      const is2xxStatus = response.status.toString().startsWith("2");
      if (!is2xxStatus) {
        throw new Error(`Received a response status of ${response.status}`);
      }
    } catch (e) {
      errCallback(e);
    }
  }

  async function makePutRequest(formData, errCallback) {
    try {
      const { id } = productModal.product;
      const response = await fetch(`/products/${id}`, {
        method: "put",
        body: formData,
      });

      const is2xxStatus = response.status.toString().startsWith("2");
      if (!is2xxStatus) {
        throw new Error(`Received a response status of ${response.status}`);
      }
    } catch (e) {
      errCallback(e);
    }
  }

  function changeInputImageSrc(onChangeEvent) {
    const reader = new FileReader();

    reader.onload = onLoadEvent => {
      imageRef.current.src = onLoadEvent.target.result;
    };

    const file = onChangeEvent.target.files[0];

    reader.readAsDataURL(file);
  }

  function imageFallback(e) {
    e.target.src = burgerFallbackImg;
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
                  price={product.formattedPrice}
                />
                <ProductsTable.Description description={product.description} />
                <ProductsTable.Subtotal subtotal={product.formattedPrice} />
                <ProductsTable.Action
                  icon={() => (
                    <IoPencil
                      size={36}
                      color="#666"
                      onClick={() =>
                        setProductModal({
                          shown: true,
                          product,
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
                        setDeletionModal({
                          shown: true,
                          productId: product.id,
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
            onClick={() => setProductModal({ shown: true })}
          >
            <IoAddOutline size={32} color="#eee" />
          </button>
        </AddProduct>
      </ProductsTable.Content>

      <Modal
        isOpen={deletionModal.shown}
        onCancel={() => setDeletionModal({ shown: false })}
        onConfirm={() => {
          deleteProduct(deletionModal.productId);
          setDeletionModal({
            shown: false,
          });
        }}
        title={`Certeza que deseja excluir o item #${
          products.findIndex(p => p.id === deletionModal.productId) + 1
        }?`}
      />

      <Modal
        isOpen={productModal.shown}
        onCancel={() => setProductModal({ shown: false })}
        onConfirm={async () => {
          await handleModal();
          setProductModal({ shown: false });
        }}
        title={
          productModal.product
            ? `Atualizando produto #${
                products.indexOf(productModal.product) + 1
              }`
            : "Criando novo produto"
        }
      >
        <ProductForm>
          <div>
            <ProductFormUpload>
              <img
                ref={imageRef}
                src={
                  productModal.product
                    ? productModal.product.imageUrl
                    : burgerFallbackImg
                }
                onError={imageFallback}
                alt={productModal.product?.title}
              />
              <IoCloudUploadOutline color="lime" size={32} />
              <input
                type="file"
                ref={imageInputRef}
                onChange={changeInputImageSrc}
              />
            </ProductFormUpload>
            <input
              ref={titleInputRef}
              type="text"
              placeholder="NOME"
              defaultValue={productModal.product?.title}
            />
            <input
              ref={priceInputRef}
              type="number"
              step="1"
              min="0"
              placeholder="PREÇO"
              defaultValue={productModal.product?.price}
            />
          </div>

          <input
            ref={descriptionInputRef}
            type="text"
            placeholder="DESCRIÇÃO"
            defaultValue={productModal.product?.description}
          />
        </ProductForm>
      </Modal>
    </ProductsTable.Container>
  );
}

export default ProductsManagement;
