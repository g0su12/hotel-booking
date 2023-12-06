import * as React from "react";
import {useState} from "react";
import "../assets/css/homepage.css";
import {DatePicker, Input, Select, Space} from "antd";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import {toast} from "react-toastify";

const { Option } = Select;
const {RangePicker} = DatePicker;

function SearchForm() {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState(1);
  // route
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date === "") {
      toast.warn("Vui lòng nhập thời gian muốn thuê");
    } else {
      history.push(`/search-results?date=${date}&bed=${bed}&place=${place}`);
    }
  };

  return (<div className="formHomepage">
    <div className="formLocation">
      <h1>Địa điểm</h1>
      <Space wrap>
        <Input value={place}
               onChange={(e) => setPlace(e.target.value)}
               placeholder="Nhập nơi bạn muốn đến"/>
      </Space>
    </div>
    <div className="vline"></div>
    <div className="formDate">
      <h1>Thời gian</h1>
      <Space direction="vertical" aria-selected="true" size={12}>
        <RangePicker
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
          className="w-100"
        />
      </Space>
    </div>
    <div className="vline"></div>
    <div className="formGuest">
      <h1>Số lượng giường</h1>
      <Space wrap>
        <Select
          style={{width: 120}}
          onChange={setBed}
          defaultValue={"1"}
        >
          <Option value="1">1 giường</Option>
          <Option value="2">2 giường</Option>
          <Option value="3">3 giường</Option>
          <Option value="4">4 giường</Option>
        </Select>
      </Space>
    </div>
    <div className="formSearch">
      <Link>
        <button onClick={handleSubmit} className="btn btn-primary">Tìm kiếm</button>
      </Link>
    </div>
  </div>);
}

export default SearchForm;
