import React, {useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Modal from '../utils/Modal';
import imgLogo from "../images/tier_logo.png"
import styled from 'styled-components';
import AxiosApi from '../api/AxiosApi';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;

  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      margin-right: 40px;
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }

  .enable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: orange;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
  }
  .enable-button:active {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  .disable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none; appearance: none;
`;

const Login = () => {
    const navigate = useNavigate();

    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    // 오류 메시지
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState("");
    const [isPw, setIsPw] = useState("");

    //팝업 처리
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };

    // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
    const onChangeId = (e) => {
        const regexId = /^\w{5,20}$/;
        setInputId(e.target.value);
        if(!regexId.test(e.target.value)) {
            setIdMessage("5자리 이상 20자리 미만으로 입력해 주세요.");
            setIsId(false);
        } else {
            setIdMessage("올바른 형식 입니다.");
            setIsId(true);
        }
    }

    const onChangePw = (e) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
      const passwordCurrent = e.target.value;
      setInputPw(passwordCurrent)
      if (!passwordRegex.test(passwordCurrent)) {
          setPwMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
          setIsPw(false)
      } else {
          setPwMessage('안전한 비밀번호에요 : )');
          setIsPw(true);
      }
    }
    const onClickLogin = async() => {
      // 로그인을 위한 axios 호출
      const res = await AxiosApi.memberLogin(inputId, inputPw);
      console.log(res.data);
      if(res.data === true) {
        window.localStorage.setItem("userId", inputId); // 브라우저에서 임시로 값을 저장하는 기술
        window.localStorage.setItem("userPw", inputPw);
        window.localStorage.setItem("isLogin", "TRUE");
        navigate('/home');  
      } else {
        setModalOpen(true);
      }
    }

    return (
       <Container>
            <div className="item1">
              <img src={imgLogo} alt="Logo" />
            </div>

            <div className="item2">
                <Input placeholder="이름" value ={inputId} onChange={onChangeId}/>
            </div>
            <div className="hint">
              {inputId.length > 0 && <span className={`${isId ? 'success' : 'error'}`}>{idMessage}</span>}
            </div>

            <div className="item2">
                <Input placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
            </div>
            <div className="hint">
                {inputPw.length > 0 && (
                    <span className={`${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
            </div>
            <div className="item2">
            {(isId && isPw) ?
              <button className="enable-button" onClick={onClickLogin}>SING IN</button>  :
              <button className="disable-button" onClick={onClickLogin}>SING IN</button>}
            </div>
            <Modal open={modalOpen} close={closeModal} header="오류">아이디 및 패스워드를 재확인해 주세요.</Modal>
            <div className="signup">
                <Link to="/Signup" className="link_style">
                    <span>Sign Up</span>
                </Link>
            </div>
       </Container>
    );

};
export default Login;    