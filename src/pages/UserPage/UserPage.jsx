import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserLayout from "../../components/UserLayout/UserLayout";
// import UserProfile from "../../components/UserLayout/UserProfile";
// import UserOrders from "../../components/UserLayout/UserReviews";
// import UserWishlist from "../../components/UserLayout/UserWishlist";
// import UserReviews from "../../components/UserLayout/UserOrders";

const UserPage = () => {
    return (
        <UserLayout>
            <Routes>
                {/* <Route path="/userPage/profile" element={<UserProfile />} /> */}
                {/* <Route path="/userPage/orders" element={<UserOrders />} /> */}
                {/* <Route path="/userPage/wishlist" element={<UserWishlist />} /> */}
                {/* <Route path="/userPage/reviews" element={<UserReviews />} /> */}
            </Routes>
        </UserLayout>
    );
};

export default UserPage;
