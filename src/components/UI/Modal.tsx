import { FC, PropsWithChildren } from "react";

interface ModalProps {
  isShow: boolean,
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({children, isShow}) => {
  return (
    <>
      {isShow && (
        <div className="modal">
          <div className="modal-content">
            {children}
          </div>
        </div>
      )}
    </>
  )
};

export default Modal;