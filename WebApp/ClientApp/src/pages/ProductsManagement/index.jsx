import React, { useState, useEffect } from "react";
import { IoFastFoodOutline, IoPencil, IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import fetchProducts from "../../utils/fetchProducts";

import ProductsTable from "../../components/ProductsTable";
import LoadingSpin from "../../components/LoadingSpin";
import EmptyList from "../../components/EmptyList";
import DeletionConfirmationModal from "./DeletionConfirmationModal";

function ProductsManagement() {
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletionModal, setDeletionModal] = useState({
    shown: undefined,
    productId: undefined,
  });

  useEffect(() => {
    (async () => {
      const response = await fetchProducts();
      setProducts(response);
      setLoaded(true);
    })();
  }, []);

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
                <ProductsTable.Subtotal subtotal={product.formattedSubtotal} />
                <ProductsTable.Action
                  icon={() => <IoPencil size={36} color="#666" />}
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

      <DeletionConfirmationModal
        isOpen={deletionModal.shown}
        onCancel={() => setDeletionModal({})}
        onConfirm={() => {
          setDeletionModal({});
          deleteProduct(deletionModal.productId);
        }}
      />
    </ProductsTable.Container>
  );
}

export default ProductsManagement;
