import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IoFastFoodOutline,
  IoPencil,
  IoTrashOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

import { createTypePredicateNodeWithModifier } from "typescript";
import { fetchProducts, fetchProduct } from "../../utils/fetchProducts";
import { UserContext } from "../../contexts/UserContext";

import ProductsTable from "../../components/ProductsTable";
import LoadingSpin from "../../components/LoadingSpin";
import EmptyList from "../../components/EmptyList";
import Modal from "./Modal";

import burgerFallbackImg from "../../assets/images/burger-illustration.png";

import {
  DeletionConfirmationMessage,
  UpdateForm,
  UpdateFormUpload,
} from "./styles";

function ProductsManagement() {
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletionModal, setDeletionModal] = useState({
    shown: false,
  });
  const [updateModal, setUpdateModal] = useState({
    shown: false,
  });
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/admin");
    }

    (async () => {
      const response = await fetchProducts();
      setProducts(response);
      setLoaded(true);
    })();
  }, [isLoggedIn, history]);

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

    const filteredProducts = products.filter(p => p.id !== id);
    setProducts(filteredProducts);
  }

  async function updateProduct(id) {
    const formData = new FormData();
    formData.append("title", titleInputRef.current.value);
    formData.append("price", priceInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    const [file] = imageInputRef.current.files;
    formData.append("file", file);

    try {
      const response = await fetch(`/products/${id}`, {
        method: "put",
        body: formData,
      });

      if (response.status === 204) {
        const product = await fetchProduct(id);
        const index = products.map(p => p.id).indexOf(id);
        const productsCopy = [...products];
        productsCopy[index] = product;

        setProducts(productsCopy);
      } else {
        toast.error("Algo deu errado ao atualizar item!", {
          style: {
            background: "#a24e4e",
          },
        });
      }
    } catch (e) {
      toast.error("Algo deu errado ao atualizar item!", {
        style: {
          background: "#a24e4e",
        },
      });
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
                        setUpdateModal({
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
      >
        <DeletionConfirmationMessage>
          Deseja excluir este item?
        </DeletionConfirmationMessage>
      </Modal>

      <Modal
        isOpen={updateModal.shown}
        onCancel={() => setUpdateModal({ shown: false })}
        onConfirm={async () => {
          await updateProduct(updateModal.product.id);
          setUpdateModal({ shown: false });
        }}
      >
        <UpdateForm>
          <div>
            <UpdateFormUpload>
              <img
                ref={imageRef}
                src={updateModal.product?.imageUrl}
                onError={imageFallback}
                alt={updateModal.product?.title}
              />
              <IoCloudUploadOutline color="lime" size={32} />
              <input
                type="file"
                ref={imageInputRef}
                onChange={changeInputImageSrc}
              />
            </UpdateFormUpload>

            <input
              ref={titleInputRef}
              type="text"
              placeholder="NOME"
              defaultValue={updateModal.product?.title}
            />
            <input
              ref={priceInputRef}
              type="number"
              step="1"
              min="0"
              placeholder="PREÇO"
              defaultValue={updateModal.product?.price}
            />
          </div>

          <input
            ref={descriptionInputRef}
            type="text"
            placeholder="DESCRIÇÃO"
            defaultValue={updateModal.product?.description}
          />
        </UpdateForm>
      </Modal>
    </ProductsTable.Container>
  );
}

export default ProductsManagement;
