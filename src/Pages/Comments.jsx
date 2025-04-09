import React, { useEffect, useState } from "react";
import ErrBox from "../Components/ErrBox";
import ClipLoader from "react-spinners/ClipLoader";
import DetailsModal from "../Components/DetailsModal";
import EditModal from "../Components/EditModal";
import ActionModal from "../Components/ActionModal";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowBodyComment, setIsShowBodyComment] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    try {
      fetch("http://localhost:8000/api/comments")
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setComments(data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const deleteModalSubmit = () => {
    try {
      fetch(`http://localhost:8000/api/comments/${commentId}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        getAllComments();
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

  const deleteModalCancel = () => {
    setIsShowDeleteModal(false);
  };

  const closeDeailsModal = () => {
    setIsShowBodyComment(false);
  };

  const editModalSubmit = () => {
    try {
      fetch(`http://localhost:8000/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }

          return res.json();
        })
        .then((result) => {
          setIsShowEditModal(false);
          getAllComments();
          toast.success("با موفقیت ویرایش شد", {
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

  const acceptModalCancel = () => {
    setIsShowAcceptModal(false);
  };

  const acceptModalSubmit = () => {
    try {
      fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
        method: "POST",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(() => {
          setIsShowAcceptModal(false);
          getAllComments();
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
      fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
        method: "POST",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(() => {
          setIsShowRejectModal(false);
          getAllComments();
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
      <h1 className="text-3xl mb-3 mt-10">لیست کامنت ها</h1>
      {/* mobile and tablet design */}
      {comments.length ? (
        <div className="space-y-4 md-lg:hidden flex flex-wrap gap-2 justify-center items-center">
          {comments.reverse().map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg bg-white shadow m-0  dark:bg-[#161616]"
            >
              <p className="px-2 pb-2">{comment.userID}</p>
              <p className="px-2 pb-2">{comment.productID}</p>

              <button
                onClick={() => {
                  setIsShowBodyComment(true);
                  setCommentBody(comment.body);
                }}
                className="bg-primary rounded-xl p-2 text-white m-1 cursor-pointer"
              >
                دیدن کامنت
              </button>

              <p className="px-2 pb-2">{comment.date}</p>
              <p className="px-2 pb-2">{comment.hour}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    setCommentId(comment.id);
                    setCommentBody(comment.body);
                  }}
                  className="bg-primary rounded-xl p-2 mx-1 my-2 text-white cursor-pointer"
                >
                  حذف
                </button>

                <button
                  onClick={() => {
                    setIsShowEditModal(true);
                    setNewComment(comment.body);
                    setCommentId(comment.id);
                  }}
                  className="bg-primary rounded-xl p-2 mx-1 my-2 text-white cursor-pointer"
                >
                  ویرایش
                </button>

                <button className="bg-primary rounded-xl p-2 mx-1 my-2 text-white  cursor-pointer">
                  پاسخ
                </button>

                {!comment.isAccept ? (
                  <>
                    <button
                      onClick={() => {
                        setIsShowAcceptModal(true);
                        setCommentBody(comment.body);
                        setCommentId(comment.id);
                      }}
                      className="bg-primary rounded-xl p-2 mx-1 my-2 text-white cursor-pointer"
                    >
                      تایید
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsShowRejectModal(true);
                        setCommentBody(comment.body);
                        setCommentId(comment.id);
                      }}
                      className="bg-primary rounded-xl p-2 mx-1 my-2 text-white cursor-pointer"
                    >
                      رد کامنت
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="md-lg:hidden flex justify-center items-center mt-10">
          <ErrBox title={"کامنتی"} />
        </div>
      )}

      {/* desktop design */}
      <div className="hidden md-lg:block">
        <div className="md-lg:flex md-lg: items-center">
          {comments.length ? (
            <div className="rounded-lg p-5 bg-white dark:bg-[#161616] ">
              <table className="table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      اسم کاربر
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      محصول
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      کامنت
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      تاریخ
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      ساعت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comments.reverse().map((comment) => (
                    <tr key={comment.id}>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                        {comment.userID}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                        {comment.productID}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3  truncate">
                        <button
                          onClick={() => {
                            setIsShowBodyComment(true);
                            setCommentBody(comment.body);
                          }}
                          className="bg-primary rounded-xl p-2 text-white my-2 cursor-pointer"
                        >
                          دیدن کامنت
                        </button>
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3  truncate">
                        {comment.date}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3 ">
                        {comment.hour}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setCommentId(comment.id);
                            setCommentBody(comment.body);
                          }}
                          className="bg-primary rounded-xl p-2 mx-3 my-2 text-white cursor-pointer"
                        >
                          حذف
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowEditModal(true);
                            setNewComment(comment.body);
                            setCommentId(comment.id);
                          }}
                          className="bg-primary rounded-xl p-2 mx-3 my-2 text-white cursor-pointer"
                        >
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button className="bg-primary rounded-xl p-2 mx-3 my-2 text-white  cursor-pointer">
                          پاسخ
                        </button>
                      </td>
                      <td>
                        {!comment.isAccept ? (
                          <>
                            <button
                              onClick={() => {
                                setIsShowAcceptModal(true);
                                setCommentBody(comment.body);
                                setCommentId(comment.id);
                              }}
                              className="bg-primary rounded-xl p-2 mx-3 my-2 text-white cursor-pointer"
                            >
                              تایید
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setIsShowRejectModal(true);
                                setCommentBody(comment.body);
                                setCommentId(comment.id);
                              }}
                              className="bg-primary rounded-xl px-4 py-2 mx-3 my-2 text-white cursor-pointer truncate"
                            >
                              رد
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
            <div className="flex justify-center items-center mt-10">
              <ErrBox title={"کامنتی"} />
            </div>
          )}
        </div>
      </div>

      {isShowDeleteModal && (
        <ActionModal
          title={`ایا از حذف کامنت "${commentBody}" اطمینان دارید ؟`}
          onCancel={deleteModalCancel}
          onSubmit={deleteModalSubmit}
        />
      )}
      {isShowAcceptModal && (
        <ActionModal
          title={`ایا از تایید کامنت "${commentBody}" اطمینان دارید ؟`}
          onCancel={acceptModalCancel}
          onSubmit={acceptModalSubmit}
        />
      )}
      {isShowRejectModal && (
        <ActionModal
          title={`ایا از رد کامنت "${commentBody}" اطمینان دارید ؟`}
          onCancel={rejectModalCancel}
          onSubmit={rejectModalSubmit}
        />
      )}
      {isShowBodyComment && (
        <DetailsModal onClose={closeDeailsModal}>{commentBody}</DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onSubmit={editModalSubmit}>
          <div className="bg-white-50 p-3 rounded-xl mb-3 border-1 border-black dark:bg-[#333]">
            <input
              className="outline-none"
              type="text"
              placeholder="کامنت جدید را وارد کنید"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
