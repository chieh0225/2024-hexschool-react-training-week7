// 刪除產品 Modal
import axios from "axios";
import Toast from "../components/Toast";
import { Modal } from "bootstrap";

import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal({ isOpen, setIsOpen, tempProduct, getProducts }) {
  const dispatch = useDispatch();

  const delProductModalRef = useRef(null);

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

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delProductModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  const handleCloseDelModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();

    setIsOpen(false);
  };

  const deleteProduct = () => {
    return axios
      .delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProduct = () => {
    deleteProduct()
      .then(() => {
        getProducts();
        dispatch(
          pushMessage({
            text: "刪除產品成功",
            status: "success",
          })
        );
        handleCloseDelModal();
      })
      .catch((error) => {
        dispatch(
          pushMessage({
            text: "刪除產品失敗",
            status: "failed",
          })
        );
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
