import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import style from "./Modal.module.css"
const Modal = (props) => {
  const { data, modal } = useAuth();
  const {} = props;
  const modalRef = useRef();
  const [open, setOpen] = useState(false);
//   console.log(useAuth());
  return (
    <dialog ref={modalRef} open={modal.showModal} id="modal" className={style.modal}>
      <header>{modal?.titleModal && <h4>{modal.titleModal}</h4>}</header>
      <main>
        {modal?.contentModal && modal.contentModal}
      </main>
    </dialog>
  );
};

export default Modal;
