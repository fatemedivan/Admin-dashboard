import React, { useEffect, useState } from "react";
import ErrBox from "../Components/ErrBox";
import ActionModal from "../Components/ActionModal";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function Offs() {
  const [offs, setOffs] = useState([]);
  const [offId, setOffId] = useState("");
  const [mainOff, setMainOff] = useState({});
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllOffs();
  }, []);

  const getAllOffs = () => {
    try {
      fetch("http://localhost:8000/api/offs")
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setOffs(data);
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
      fetch(`http://localhost:8000/api/offs/${offId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllOffs();
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

  const acceptCancelModal = () => {
    setIsShowAcceptModal(false);
  };

  const acceptSubmitModal = () => {
    try {
      fetch(`http://localhost:8000/api/offs/active-off/${offId}/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllOffs();
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

  const rejectCancelModal = () => {
    setIsShowRejectModal(false);
  };

  const rejectSubmitModal = () => {
    try {
      fetch(`http://localhost:8000/api/offs/active-off/${offId}/0`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllOffs();
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
      <h1 className="text-3xl mb-3 mt-10">لیست تخفیف ها</h1>
      {/* mobile and tablet design */}
      {offs.length ? (
        <div className="space-y-4 md-lg:hidden flex flex-wrap gap-2 justify-center items-center">
          {offs.reverse().map((off) => (
            <div
              key={off.id}
              className="p-4 rounded-lg bg-white shadow m-0 dark:bg-[#161616]"
            >
              <div className="flex flex-wrap gap-2">
                <p className="px-2 pb-2">{off.adminID}</p>
                <p className="px-2 pb-2">{off.code}</p>
                <p className="px-2 pb-2">{off.productID}</p>
                <p className="px-2 pb-2">{off.date}</p>
                <p className="px-2 pb-2">%{off.percent}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    setOffId(off.id);
                    setMainOff(off);
                  }}
                  className="bg-primary rounded-xl p-2 my-2 text-white mx-1 cursor-pointer"
                >
                  حذف
                </button>

                {off.isActive ? (
                  <>
                    <button
                      onClick={() => {
                        setIsShowRejectModal(true);
                        setMainOff(off);
                        setOffId(off.id);
                      }}
                      className="bg-primary rounded-xl px-4 py-2 my-2 text-white mx-1 cursor-pointer truncate"
                    >
                      رد
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsShowAcceptModal(true);
                        setMainOff(off);
                        setOffId(off.id);
                      }}
                      className="bg-primary rounded-xl p-2 my-2 text-white mx-1 cursor-pointer truncate"
                    >
                      تایید
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <ErrBox title={"تخفیفی"} />
        </div>
      )}
      {/* desktop design */}
      <div className="hidden md-lg:block">
        <div className="md-lg:flex md-lg: items-center">
          {offs.length ? (
            <div className="rounded-lg p-5 bg-white dark:bg-[#161616]">
              <table className="table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4 ">
                      ادمین
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                      کد
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                      محصول
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                      تاریخ
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                      میزان تخفیف
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offs.reverse().map((off) => (
                    <tr key={off.id}>
                      <td className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                        {off.adminID}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                        {off.code}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                        {off.productID}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                        {off.date}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-3 lg:text-lg lg:px-4">
                        %{off.percent}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setOffId(off.id);
                            setMainOff(off);
                          }}
                          className="bg-primary rounded-xl p-2 my-2 text-white mx-3 cursor-pointer"
                        >
                          حذف
                        </button>
                      </td>
                      <td>
                        {off.isActive ? (
                          <>
                            <button
                              onClick={() => {
                                setIsShowRejectModal(true);
                                setMainOff(off);
                                setOffId(off.id);
                              }}
                              className="bg-primary rounded-xl px-4 py-2 my-2 text-white mx-3 cursor-pointer truncate"
                            >
                              رد
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setIsShowAcceptModal(true);
                                setMainOff(off);
                                setOffId(off.id);
                              }}
                              className="bg-primary rounded-xl p-2 my-2 text-white mx-3 cursor-pointer truncate"
                            >
                              تایید
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="md-lg:hidden flex justify-center items-center mt-10">
              <ErrBox title={"تخفیفی"} />
            </div>
          )}
        </div>
      </div>
      {isShowDeleteModal && (
        <ActionModal
          title={`ایا از حذف "${mainOff.code}" اطمینان دارید ؟`}
          onCancel={deleteModalCancel}
          onSubmit={deleteModalSubmit}
        />
      )}
      {isShowAcceptModal && (
        <ActionModal
          title={`ایا از تایید${mainOff.code} اطمینان دارید ؟`}
          onCancel={acceptCancelModal}
          onSubmit={acceptSubmitModal}
        />
      )}
      {isShowRejectModal && (
        <ActionModal
          title={`ایا از رد "${mainOff.code}" اطمینان دارید ؟`}
          onCancel={rejectCancelModal}
          onSubmit={rejectSubmitModal}
        />
      )}
    </div>
  );
}
