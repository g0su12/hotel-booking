import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import "../src/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import HomePage from "./booking/Home";
import AuthPage from "./auth/AuthPage";
import TopNav from "./@components/TopNav";
import Dashboard from "./user/Dashboard";
import AuthGuard from "./@components/AuthGuard";
import NewHotel from "./hotels/NewHotel";
import SearchPage from "./booking/SearchPage";
import DetailPage from "./hotels/DetailPage";
import EditHotel from "./hotels/EditHotel";
import StripeCallback from "./stripe/StripeCallback";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import DashboardHotel from "./user/DashboardHotel";
import LoadingOverlay from "./common/utils/LoadingOverlay";
import {SellerRooms} from "./user/dashBoardSeller/SellerRooms";
import {SellerOrders} from "./user/dashBoardSeller/SellerOrders";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer />
      <LoadingOverlay />
      <div className="main-content">
        <Switch>
          <AuthGuard exact path="/dashboard/renter" component={Dashboard} />
          <AuthGuard
            exact
            path="/dashboard/rooms"
            component={DashboardHotel}
          />
          <AuthGuard exact path="/rooms/add-room" component={NewHotel} />
          <AuthGuard exact path="/stripe/callback" component={StripeCallback} />
          <AuthGuard
            exact
            path="/stripe/success/:roomId"
            component={StripeSuccess}
          />
          <AuthGuard exact path="/stripe/cancel" component={StripeCancel} />
          <Route exact path="/rooms/:roomId" component={DetailPage} />
          <AuthGuard
            exact
            path="/rooms/update-room/:roomId"
            component={EditHotel}
          />

          <Route exact path="/search-results" component={SearchPage} />
          <AuthGuard
            exact
            path="/dashboard/seller/rooms"
            component={SellerRooms}
          />
          <AuthGuard
            exact
            path="/dashboard/seller/orders"
            component={SellerOrders}
          />
          <Route path="/auth" component={AuthPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
