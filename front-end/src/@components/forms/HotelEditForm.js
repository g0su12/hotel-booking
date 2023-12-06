import {DatePicker, Select} from "antd";
import moment from "moment";

const {Option} = Select;

const HotelEditForm = ({
                         values, setValues, handleChange, handleImageChange, handleSubmit,
                       }) => {
  const {title, content, location, price, bed} = values;

  return (<form onSubmit={handleSubmit}>
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
        placeholder="Title"
        className="form-control m-2"
        value={title}
      />

      <textarea
        name="content"
        onChange={handleChange}
        rows="4"
        placeholder="Content"
        className="form-control m-2"
        value={content}
      />

      <input
        name="location"
        onChange={handleChange}
        placeholder="Location"
        className="form-control m-2"
        value={location}
      />

      <input
        type="number"
        name="price"
        onChange={handleChange}
        placeholder="Price"
        className="form-control m-2"
        value={price}
      />
      <Select
        onChange={(value) => setValues({...values, bed: value})}
        className="w-100 m-2"
        size="large"
        placeholder="Number of beds"
        value={bed}
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>
    </div>
    <button className="btn btn-outline-primary m-2">Lưu thông tin</button>
  </form>);
};

export default HotelEditForm;
