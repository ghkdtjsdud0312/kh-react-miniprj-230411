import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일
import PopupAddr from "../../component/address/popupAddr";
import styled from "styled-components";

const Addr = styled.div`
    font-size: 30px;
`;

const MyCalendar = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const onChangeDateRange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <div>
      <div>
        <label>시작일:</label>
        <Calendar
          onChange={onChangeDateRange}
          value={dateRange}
          selectRange={true}
        />
        <p>선택된 시작일: {dateRange[0].toDateString()}</p>
      </div>
      <div>
        <label>종료일:</label>
        <p>선택된 종료일: {dateRange[1].toDateString()}</p>
      </div>    
      <Addr>[주소 검색]</Addr>  
      <PopupAddr />
    </div>
  );
};

export default MyCalendar;
