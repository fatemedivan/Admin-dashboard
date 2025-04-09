import React, { useEffect, useState } from "react";
import ErrBox from "../Components/ErrBox";
import ActionModal from "../Components/ActionModal";
import DetailsModal from "../Components/DetailsModal";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [mainOrder, setMainOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    try {
      fetch("http://localhost:8000/api/orders")
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setOrders(data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const deleteModalCancel = () => {
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmit = () => {
    try {
      fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllOrders();
        setIsShowDeleteModal(false);
        toast.success("با موفقیت حذف شد", {
          className: "Toastify--toast",
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
  };

  const acceptModalCancel = () => {
    setIsShowAcceptModal(false);
  };

  const acceptModalSubmit = () => {
    try {
      fetch(`http://localhost:8000/api/orders/active-order/${orderId}/0`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllOrders();
        setIsShowAcceptModal(false);
        toast.success("با موفقیت تایید شد", {
          className: "Toastify--toast",
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const rejectModalCancel = () => {
    setIsShowRejectModal(false);
  };

  const rejectModalSubmit = () => {
    try {
      fetch(`http://localhost:8000/api/orders/active-order/${orderId}/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllOrders();
        setIsShowRejectModal(false);
        toast.success("با موفقیت رد شد", {
          className: "Toastify--toast",
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      isLoading && (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <HashLoader color="#471AAA" size={80} />
          <p className="mt-5 text-lg text-gray-600 animate-pulse dark:text-white">
            loading...
          </p>
        </div>
      )
    );
  }

  return (
    <div>
      <h1 className="text-3xl mb-3 mt-10">لیست سفارشات</h1>
      {/* mobile and tablet design */}
      {orders.length ? (
        <>
          <div className="space-y-4 md-lg:hidden flex flex-wrap gap-2 justify-center items-center">
            {orders.reverse().map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-lg bg-white shadow m-0 dark:bg-[#161616]"
              >
                <p className="px-2 pb-2">{order.id}</p>
                <p className="px-2 pb-2">{order.productID}</p>
                <p className="px-2 pb-2">{order.userID}</p>
                <p className="px-2 pb-2">{order.date}</p>
                <p className="px-2 pb-2">{order.hour}</p>
                <p className="px-2 pb-2">{order.price}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setOrderId(order.id);
                      setMainOrder(order);
                    }}
                    className="bg-primary rounded-xl p-2 my-2 text-white mx-1 cursor-pointer truncate"
                  >
                    حذف
                  </button>

                  {order.isActive ? (
                    <>
                      <button
                        onClick={() => {
                          setIsShowAcceptModal(true);
                          setOrderId(order.id);
                          setMainOrder(order);
                        }}
                        className="bg-primary rounded-xl p-2 my-2 text-white mx-1 cursor-pointer truncate"
                      >
                        تایید
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsShowRejectModal(true);
                          setOrderId(order.id);
                          setMainOrder(order);
                        }}
                        className="bg-primary rounded-xl px-4 py-2 my-2 text-white mx-1 cursor-pointer truncate"
                      >
                        رد
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainOrder(order);
                    }}
                    className="bg-primary rounded-xl p-2 my-2 text-white mx-1 cursor-pointer truncate"
                  >
                    مشاهده
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <ErrBox title={"سفارشی"} />
        </div>
      )}
      {/* desktop design */}
      <div className="hidden md-lg:block ">
        <div className="md-lg:flex md-lg: items-center">
          {orders.length ? (
            <div className="rounded-lg p-5 bg-white dark:bg-[#161616]">
              <table>
                <thead>
                  <tr>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                      ایدی
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                      محصول
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                      کاربر
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                      تاریخ
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                      ساعت
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                      قیمت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.reverse().map((order) => (
                    <tr key={order.id}>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        {order.id}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        {order.productID}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        {order.userID}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        {order.date}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        {order.hour}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-2 lg:text-lg lg:px-3">
                        {order.price}
                      </td>

                      <td>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setOrderId(order.id);
                            setMainOrder(order);
                          }}
                          className="bg-primary rounded-xl p-2 my-2 text-white mx-3 cursor-pointer truncate"
                        >
                          حذف
                        </button>
                      </td>
                      <td>
                        {order.isActive ? (
                          <>
                            <button
                              onClick={() => {
                                setIsShowAcceptModal(true);
                                setOrderId(order.id);
                                setMainOrder(order);
                              }}
                              className="bg-primary rounded-xl p-2 my-2 text-white mx-3 cursor-pointer truncate"
                            >
                              تایید
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setIsShowRejectModal(true);
                                setOrderId(order.id);
                                setMainOrder(order);
                              }}
                              className="bg-primary rounded-xl px-4 py-2 my-2 text-white mx-3 cursor-pointer truncate"
                            >
                              رد
                            </button>
                          </>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowDetailsModal(true);
                            setMainOrder(order);
                          }}
                          className="bg-primary rounded-xl p-2 my-2 text-white mx-3 cursor-pointer truncate"
                        >
                          مشاهده
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="md-lg:hidden flex justify-center items-center mt-10">
              <ErrBox title={"سفارشی"} />
            </div>
          )}
        </div>
      </div>
      {isShowDeleteModal && (
        <ActionModal
          title={`ایا از حذف  سفارش  "${mainOrder.id}" اطمینان دارید ؟`}
          onCancel={deleteModalCancel}
          onSubmit={deleteModalSubmit}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onClose={closeDetailsModal}>
          <table>
            <thead>
              <tr>
                <th className="px-5 py-3">موجودی</th>
                <th className="px-5 py-3">محبوبیت</th>
                <th className="px-5 py-3">فروش</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5">{mainOrder.count}</td>
                <td className="px-5">{mainOrder.popularity}</td>
                <td className="px-5">{mainOrder.sale}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowAcceptModal && (
        <ActionModal
          title={`ایا از تایید  سفارش "${mainOrder.id}" اطمینان دارید ؟`}
          onCancel={acceptModalCancel}
          onSubmit={acceptModalSubmit}
        />
      )}
      {isShowRejectModal && (
        <ActionModal
          title={`ایا از رد  سفارش "${mainOrder.id}" اطمینان دارید ؟`}
          onCancel={rejectModalCancel}
          onSubmit={rejectModalSubmit}
        />
      )}
    </div>
  );
}
