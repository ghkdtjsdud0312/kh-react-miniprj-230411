import React from 'react';
import DaumPostcode from "react-daum-postcode";
 import styled from 'styled-components';

 const PopupPostCodeCss =styled.div`
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
   .postWrapper {
     width: 50%;
     height: 80%;
     margin: 0 auto;
     position: relative;
     top: 15%;
     .close {
       padding: 17px;
       background-color: white;
       display: flex;
       justify-content: end;
       button {
         background-color: var(--DARKBLUE);
         border: none;
         padding: 10px 12px;
         color: black;
         font-size: 1em;
       }
     }
    }
    .postCode_btn {
      width: 520px;
      background-color: #ffffff;
      border-style: none;
      box-sizing: border-box;
      height: 65px;
      text-align: right;
      padding-right: 23px;
      cursor: pointer;
    }
 `;

const PopupPostCode = (props) => {
    const { onClose, setAddr } = props;
	  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)//주소
        console.log(data.zonecode)//지번
        props.onClose()
        props.setInputAdd(fullAddress)
        props.setInputAdd2(data.zonecode)
      
    }
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "520px",
        height: "480px",
        padding: "7px",
      };
 
    return(
      
        <PopupPostCodeCss>
        <div className="postWrapper">
            <DaumPostcode className="close" style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>X</button>
        </div>
        </PopupPostCodeCss>
    )
}
 
export default PopupPostCode;