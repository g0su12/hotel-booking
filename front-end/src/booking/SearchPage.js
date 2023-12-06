import {useEffect, useState} from "react";
import SearchForm from "../@components/SearchForm";
import FilterSearch from "../@components/tinyComp/FilterSearch";
import {Card} from "antd";
import "../assets/css/hotel.css";
import "../assets/css/homepage.css";
import {API} from "../common/constants/api";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import * as queryString from "querystring";
import {searchResults} from "../actions/hotel";

const SearchPage = () => {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState("0to0");

  const history = useHistory();
  const {place, date, bed} = queryString.parse(window.location.search.slice(1));
  useEffect(() => {
    searchResults({place, date, bed}).then((res) => {
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <div className="hotel">
      <SearchForm/>
      <div className="hotelGroup">
        <FilterSearch filter={filter} setFilter={setFilter}/>
        <div className="hotelList">
          <div className="hotelListTitle">
            <h4>Danh sách phòng tại {place}</h4>
          </div>
          {hotels.map((hotel) => {
            return (
              <Card
                className="hotelCard"
                hoverable
                cover={<img alt="example" src={`${API.BASE_URL}${API.GET_IMAGE_BY_ID}${hotel._id}`}/>}
              >
                <div className="hotelCardInfo">
                  <h4>{hotel.title}</h4>
                  <h3>
                    {hotel.location}
                  </h3>
                  <p>{hotel.price}USD/đêm</p>
                  <p>{hotel.content.length > 150 ? hotel.content.slice(0, 150) + "..." : hotel.content}</p>
                  <button
                    className="hotelCardButton"
                    value={hotel.name}
                    onClick={() => history.push(`/rooms/${hotel._id}?date=${date}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
