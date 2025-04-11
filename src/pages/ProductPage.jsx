import axios from "axios";
import { Modal } from "bootstrap";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";
import Toast from "../components/Toast";

import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};

function ProductPage({ setIsAuth }) {
  const [productList, setProductList] = useState([]);

  const [modalMode, setModalMode] = useState(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

  const getProducts = (page = 1) => {
    axios
      .get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`)
      .then((res) => {
        setProductList(res.data.products);
        setPageInfo(res.data.pagination);
      })
      .catch(() => {
        alert("取得產品失敗");
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOpenModal = (mode, product) => {
    setModalMode(mode);

    if (mode === "create") {
      setTempProduct(defaultModalState);
    } else if (mode === "edit") {
      setTempProduct(product);
    }

    setIsProductModalOpen(true);
  };

  const handleOpenDelModal = (product) => {
    setTempProduct(product);

    setIsDelProductModalOpen(true);
  };

  const [tempProduct, setTempProduct] = useState(defaultModalState);

  // 分頁功能
  const [pageInfo, setPageInfo] = useState({});

  const handlePageChange = (page) => {
    getProducts(page);
  };

  // 登出功能
  const handleLogout = async () => {
    axios
      .post(`${BASE_URL}/v2/logout`)
      .then(() => {
        alert("成功登出");
        setIsAuth(false);
      })
      .catch(() => {
        alert("登出失敗");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleLogout}
            >
              登出
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-baseline mb-3">
              <h2>產品列表</h2>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleOpenModal("create")}
              >
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleOpenModal("edit", product)}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleOpenDelModal(product)}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
      </div>

      <ProductModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        modalMode={modalMode}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
      />

      <DelProductModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        isOpen={isDelProductModalOpen}
        setIsOpen={setIsDelProductModalOpen}
      />

      <Toast />
    </>
  );
}

export default ProductPage;
