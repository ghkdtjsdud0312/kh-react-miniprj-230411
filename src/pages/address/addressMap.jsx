import React, { useState } from "react";
import DaumPostPopup from "../../api/DaumPost";
import styled from "styled-components";

const Joinstyle = styled.div`

`;

const Map = () => {

const [inputAddr, setInputAddr] = useState("");
const [isAddr, setIsAddr] = useState(false);

  //주소 팝업
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const openPostCode = () => {
    setIsPopUpOpen(true);
  };
  const closePostCode = () => {
    setIsPopUpOpen(false);
  };

  const setAddr = (addr) => {
    setInputAddr(addr);
    setIsAddr(true);
  };

  return (
    <>
      <Joinstyle>
        <div className="container">
            <DaumPostPopup />
            <div className="inputArea">
              <label name="addr">
                <span>주소</span>
                <input
                  type="text"
                  defaultValue={inputAddr}
                  readOnly={true}
                  onClick={openPostCode}
                />
                <button className="active" onClick={openPostCode}>
                  주소찾기
                </button>
              </label>
              {isPopUpOpen && (
                <DaumPostPopup onClose={closePostCode} setAddr={setAddr} />
              )}
            </div>
              <button>제출하기</button>
        </div>
      </Joinstyle>
    </>
  );
};

export default Map;