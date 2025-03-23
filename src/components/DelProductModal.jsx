// 刪除產品 Modal
import axios from "axios";
import Toast from "../components/Toast";
import { Modal } from "bootstrap";

import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal({ tempProduct, getProducts, delProductModalRef }) {
  useEffect(() => {
    new Modal(delProductModalRef.current, {
      backdrop: false,
    });

    delProductModalRef.current.addEventListener("hide.bs.modal", () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, []);

  const handleCloseDelModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
  };

  const deleteProduct = () => {
    return axios
      .delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  const handleDeleteProduct = () => {
    deleteProduct()
      .then(() => {
        getProducts();
        Toast.fire({
          icon: "success",
          title: "刪除產品成功",
        });
        handleCloseDelModal();
      })
      .catch((error) => {
        alert("刪除產品失敗");
      });
  };

  return (
    <div
      ref={delProductModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseDelModal}
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseDelModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteProduct}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelProductModal;
