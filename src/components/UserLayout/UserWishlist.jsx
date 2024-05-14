import React from "react";
import WishListItem from "../WishListItem/WishListItem";
import { useSelector } from "react-redux";

const UserWishlist = () => {
    const { wishList } = useSelector((state) => state.wishList);

    return (
        <div>
            {wishList.map((item) => (
                <WishListItem key={item._id} product={item} />
            ))}
        </div>
    );
};

export default UserWishlist;
