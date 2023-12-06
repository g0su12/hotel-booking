import {DatePicker, Select} from "antd";
import moment from "moment";

const {Option} = Select;

const HotelCreateForm = ({
                           values,
                           setValues,
                           handleChange,
                           handleImageChange,
                           handleSubmit
                         }) => {
  const {title, content, location, price} = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Hình ảnh minh hoạ
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Tên phòng"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          rows={4}
          placeholder="Mô tả"
          className="form-control m-2"
          value={content}
        />

        <input
          name="location"
          onChange={handleChange}
          placeholder="Địa điểm"
          className="form-control m-2"
          value={location}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Giá phòng"
          className="form-control m-2"
          value={price}
        />
        <Select
          onChange={(value) => setValues({...values, bed: value})}
          className="w-100 m-2"
          size="large"
          placeholder="Số lượng giường"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>


      <button className="btn btn-outline-primary m-2">Gửi thông tin</button>
    </form>
  );
};

export default HotelCreateForm;
