import React, { useState } from 'react';
import PopupDom from './popupDom';
import PopupPostCode from './popupPostCode';
import styled from 'styled-components';

const PopupAddrCss = styled.div`
  
`
const Joinstyle = styled.div`
    .inputArea {
        font-size: 20px;
        margin: 20px 20px;
    }
    input {
        margin-left: 20px;
    }
    .detailAddr {
        margin-left: 35px;
    }
    .submit {
       margin-left: 100px;
    }
    
`;


const PopupAddr = () => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    const [inputAddr, setInputAddr] = useState("");
    const [isAddr, setIsAddr] = useState(false);


   const setAddr = (addr) => {
     setInputAddr(addr);
     setIsAddr(true);
   };
 
    return(
        <>
         <Joinstyle>
         <div className="container">
            
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
                   주소검색 
                 </button>               
                 </label>
                 <div className='detailAddr'>
                 <input type="text" placeholder='상세주소 입력하기'/>
                 </div>
                 <div className='submit'>
                    <button>제출하기</button>
                 </div>
                
               
             </div>
         </div>
       </Joinstyle>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
    </>
    )
}
 
export default PopupAddr;