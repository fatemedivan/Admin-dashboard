import React, { useEffect, useState } from "react";
import ErrBox from "../Components/ErrBox";
import ActionModal from "../Components/ActionModal";
import EditModal from "../Components/EditModal";
import DetailsModal from "../Components/DetailsModal";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [mainUser, setMainUser] = useState({});
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newScore, setNewScore] = useState("");
  const [newBuy, setNewBuy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    try {
      fetch("http://localhost:8000/api/users")
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setUsers(data);
          console.log(data);
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
      fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
        })
        .then((result) => {
          console.log(result);
          getAllUsers();
          setIsShowDeleteModal(false);
          toast.success("با موفقیت حذف شد", {
            className: "Toastify--toast",
            theme: localStorage.getItem("theme") === "dark" ? "dark" : "light"
          });
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const editModalSubmit = () => {
    const newUserInfos = {
      firsname: newFirstName,
      lastname: newLastName,
      username: newUserName,
      password: newPassword,
      phone: newPhone,
      city: newCity,
      email: newEmail,
      address: newAddress,
      score: newScore,
      buy: newBuy,
    };
    try {
      fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserInfos),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((result) => {
          console.log(result);
          getAllUsers();
          setIsShowEditModal(false);
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

  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
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
      <h1 className="text-3xl mb-3 mt-10">لیست کاربران</h1>
      {/* mobile and tablet design */}
      {users.length ? (
        <div className="space-y-4 md-lg:hidden flex flex-wrap gap-2 justify-center items-center">
          {users.reverse().map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-lg bg-white shadow m-0  dark:bg-[#161616]"
            >
              <p className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                {user.firsname} {user.lastname}
              </p>
              <p className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                {user.username}
              </p>

              <p className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                {user.phone}
              </p>
              <p className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    setUserId(user.id);
                    setIsShowDeleteModal(true);
                    setMainUser(user);
                  }}
                  className="bg-primary rounded-xl p-2 text-white mx-1  my-2 cursor-pointer"
                >
                  حذف
                </button>

                <button
                  onClick={() => {
                    setIsShowEditModal(true);
                    setUserId(user.id);
                    setNewFirstName(user.firsname);
                    setNewLastName(user.lastname);
                    setNewUserName(user.username);
                    setNewPassword(user.password);
                    setNewPhone(user.phone);
                    setNewCity(user.city);
                    setNewEmail(user.email);
                    setNewAddress(user.address);
                    setNewScore(user.score);
                    setNewBuy(user.buy);
                  }}
                  className="bg-primary rounded-xl p-2 text-white mx-1  my-2 cursor-pointer"
                >
                  ویرایش
                </button>

                <button
                  onClick={() => {
                    setIsShowDetailsModal(true);
                    setMainUser(user);
                  }}
                  className="bg-primary rounded-xl p-2 my-2 text-white mx-1 cursor-pointer"
                >
                  مشاهده
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="md-lg:hidden flex justify-center items-center mt-10">
          <ErrBox title={"کاربری"} />
        </div>
      )}
      {/* desktop design */}
      <div className="hidden md-lg:block">
        <div className="md-lg:flex md-lg: items-center">
          {users.length ? (
            <div className="rounded-lg p-5 bg-white dark:bg-[#161616]">
              <table>
                <thead>
                  <tr>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      نام و نام خانوادگی
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      نام کاربری
                    </th>

                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      تماس
                    </th>
                    <th className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                      ایمیل
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.reverse().map((user) => (
                    <tr key={user.id}>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                        {user.firsname} {user.lastname}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                        {user.username}
                      </td>

                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                        {user.phone}
                      </td>
                      <td className="pb-3 text-xs md:text-sm md:px-1 lg:text-lg lg:px-3">
                        {user.email}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setUserId(user.id);
                            setIsShowDeleteModal(true);
                            setMainUser(user);
                          }}
                          className="bg-primary rounded-xl p-2 text-white mx-3 my-2 cursor-pointer"
                        >
                          حذف
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowEditModal(true);
                            setUserId(user.id);
                            setNewFirstName(user.firsname);
                            setNewLastName(user.lastname);
                            setNewUserName(user.username);
                            setNewPassword(user.password);
                            setNewPhone(user.phone);
                            setNewCity(user.city);
                            setNewEmail(user.email);
                            setNewAddress(user.address);
                            setNewScore(user.score);
                            setNewBuy(user.buy);
                          }}
                          className="bg-primary rounded-xl p-2 text-white mx-3 my-2 cursor-pointer"
                        >
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowDetailsModal(true);
                            setMainUser(user);
                          }}
                          className="bg-primary rounded-xl p-2 my-2 text-white mx-3 cursor-pointer"
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
            <div className="flex justify-center items-center mt-10">
              <ErrBox title={"کاربری"} />
            </div>
          )}
        </div>
      </div>
      {isShowDeleteModal && (
        <ActionModal
          title={`ایا از حذف کاربر "${mainUser.firsname}" اطمینان دارید ؟`}
          onCancel={deleteModalCancel}
          onSubmit={deleteModalSubmit}
        />
      )}
      {isShowEditModal && (
        <EditModal onSubmit={editModalSubmit}>
          <div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="نام جدید کاربر را وارد کنید"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="نام خانوادگی جدید کاربر را وارد کنید"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="نام کاربری جدید کاربر را وارد کنید"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="پسورد جدید کاربر را وارد کنید"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="شماره تماس جدید کاربر را وارد کنید"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="شهر جدید کاربر را وارد کنید"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="ایمیل  جدید کاربر را وارد کنید"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="ادرس جدید کاربر را وارد کنید"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="امتیاز جدید کاربر را وارد کنید"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
              />
            </div>
            <div className="bg-white-50 p-2 rounded-xl mb-1 border-1 border-black dark:bg-[#333]">
              <input
                className="outline-none"
                type="text"
                placeholder="میزان خرید جدید کاربر را وارد کنید"
                value={newBuy}
                onChange={(e) => setNewBuy(e.target.value)}
              />
            </div>
          </div>
        </EditModal>
      )}
      {isShowDetailsModal && (
        <DetailsModal onClose={closeDetailsModal}>
          <table>
            <thead>
              <tr>
                <th className="px-5 py-3">شهر</th>
                <th className="px-5 py-3">ادرس</th>
                <th className="px-5 py-3">امتیاز</th>
                <th className="px-5 py-3">میزان خرید</th>
                <th className="px-5 py-3">رمز عبور</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5">{mainUser.city}</td>
                <td className="px-5">{mainUser.address}</td>
                <td className="px-5">{mainUser.score}</td>
                <td className="px-5">{mainUser.buy}</td>
                <td className="px-5">{mainUser.password}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  );
}
