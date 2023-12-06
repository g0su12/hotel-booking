import React, { useState } from 'react';
import { Input, Radio, Space } from 'antd';

const FilterSearch = ({filter, setFilter}) => {
  return <div className="hotelSort">
    <h3>Lọc kết quả:</h3>
    <div className="hotelSortItem">
      <div className="SearchItem">
        <input type="search" name="search" placeholder="Hotel Name"/>
      </div>
      <div className="PriceGroup">
        <p>Lọc theo giá tiền: </p>
        <Radio.Group onChange={e => setFilter(e.target.value)} value={filter}>
          <Space direction="vertical">
            <Radio
              value="0to0">
              Không lọc
            </Radio>
            <Radio
              value="0to20">
              $0 - $20
            </Radio>
            <Radio
              value="20to40"
            >
              $20 - $40
            </Radio>
            <Radio
              value="40to60"
            >
              $40 - $60
            </Radio>
            <Radio
              value="gte60"
            >
              > $60
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  </div>
}

export default FilterSearch;