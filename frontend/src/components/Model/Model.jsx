import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import img from "../../assets/react.svg";
import { IoMdClose } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import axios from "axios";
import { url } from "../../utils/util";
const Model = ({ productId }) => {
  const [isOpen, setisOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    //  adduseremialtoproduct(productid,email)
    const response = await axios.post(
      `${url}/api/products/track`,
      {
        productId: productId,
        useremail: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    setloading(false);
    setemail("");
    setisOpen(false);
  };
  return (
    <>
      <button type="button" onClick={() => setisOpen(true)} className="btn">
        Track
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="dialog-container"
          open={isOpen}
          onClose={() => setisOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-0"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0"></div>
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            ></span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="p-3 border-gray-200 rounded-10">
                      <img src={img} width={28} height={28} alt="" />
                    </div>
                    <IoMdClose
                      className="cursor-pointer text-3xl"
                      onClick={() => setisOpen(false)}
                    />
                  </div>
                  <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                  <label
                    htmlFor="email"
                    className="tex-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <MdMailOutline />
                    <input
                      className="dialog-input"
                      type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      id="email"
                      placeholder="Enter you email"
                      required
                    />
                  </div>
                  <button type="submit" className="dialog-btn">
                    {loading ? "Tracking..." : "Track"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Model;
