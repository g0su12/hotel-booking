import {useState} from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import HotelCreateForm from "../@components/forms/HotelAddForm";
import {createHotel} from "../actions/hotel";

const NewHotel = ({history}) => {
  // redux
  const {auth} = useSelector((state) => ({...state}));
  const {token} = auth;
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/600x400.png?text=PREVIEW"
  );
  // destructuring variables from state
  const {title, content, location, image, price, bed} = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("bed", bed);

    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await createHotel(token, hotelData);
      dispatch({
        type: "HIDE_LOADING",
      });
      toast.success("Đăng tải thành công! Hãy chờ người quản trị duyệt thông tin.", {
        position: "top-right",
        autoClose: 3000,
      });
      history.push("/dashboard/seller/rooms");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({...values, image: e.target.files[0]});
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  return (
    <>
      <div className="container-fluid p-3 text-center">
        <h2>Thêm phòng mới</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-6">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
