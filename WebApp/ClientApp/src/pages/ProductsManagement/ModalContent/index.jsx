import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import imageFallback from "../../../utils/imageFallback";
import burgerFallbackImg from "../../../assets/images/burger-illustration.png";

import { FormInput, ProductForm, ProductFormUpload } from "./styles";

const ModalContent = {
  Product({
    imageRef,
    imageInputRef,
    titleInputRef,
    priceInputRef,
    descriptionInputRef,
    product,
  }) {
    function changeInputImageSrc(onChangeEvent) {
      const reader = new FileReader();

      reader.onload = onLoadEvent => {
        imageRef.current.src = onLoadEvent.target.result;
      };

      const file = onChangeEvent.target.files[0];

      reader.readAsDataURL(file);
    }

    return (
      <ProductForm>
        <div>
          <ProductFormUpload>
            <img
              ref={imageRef}
              src={product ? product.imageUrl : burgerFallbackImg}
              onError={imageFallback}
              alt={product?.title}
            />
            <IoCloudUploadOutline color="lime" size={32} />
            <FormInput
              type="file"
              ref={imageInputRef}
              onChange={changeInputImageSrc}
            />
          </ProductFormUpload>
          <FormInput
            ref={titleInputRef}
            type="text"
            placeholder="NOME"
            defaultValue={product?.title}
          />
          <FormInput
            ref={priceInputRef}
            type="number"
            step="0.01"
            min="0"
            placeholder="PREÇO"
            defaultValue={product?.price}
          />
        </div>

        <FormInput
          ref={descriptionInputRef}
          type="text"
          placeholder="DESCRIÇÃO"
          defaultValue={product?.description}
        />
      </ProductForm>
    );
  },
  Discount({ discountAmountInputRef }) {
    return (
      <FormInput
        ref={discountAmountInputRef}
        type="number"
        min="0"
        step="0.01"
        placeholder="DESCONTO"
      />
    );
  },
};

export default ModalContent;
