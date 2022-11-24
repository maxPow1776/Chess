import { FC, useState } from "react";
import { Colors } from "../models/Colors";
import Modal from "./UI/Modal";

interface StartModal {
  isShow: boolean,
  time: number,
  setTime: (time: number) => void,
  setIsShowModal: (isShow: boolean) => void,
  loser: Colors | null,
  setLoser: (loser: Colors| null) => void
}

const StartModal: FC<StartModal> = ({isShow, time, setTime, setIsShowModal, loser, setLoser}) => {
  
  const updateTime = (newTime: string) => {
    const newTimeNumber = +newTime;
    if (!isNaN(newTimeNumber)) setTime(newTimeNumber);   
  }

  const closeModal = () => {
    setIsShowModal(false);
    setLoser(null);
  }

  return (
    <Modal isShow={isShow}>
      <h1>Chess</h1>
      <hr />
      {loser &&
        <div>
          <h2>Lost: {loser}</h2>
          <hr />
        </div>
      }
      <div>
        <span>Enter game time (s): </span>
        <input type="text" value={time} onChange={e => updateTime(e.target.value)}></input>
      </div>
      <button disabled={time === 0} onClick={closeModal}>Start</button>
    </Modal>
  )
};

export default StartModal;