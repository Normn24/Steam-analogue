import { NavLink } from "react-router-dom";
import { CiUser, CiViewList, CiShoppingBasket, CiStar } from "react-icons/ci";
import useStyles from "./UserStyles";
// import UserWishlist from "./UserWishlist";

const UserLayout = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.userPage}>
            <div className={classes.userNav}>
                <div className={classes.userInfo}>
                    <p>User Name</p>
                    <p>User Mail</p>
                </div>
                <div className={classes.userItem}>
                    <div className={classes.navItem}>
                        <NavLink to="/userPage/profile" className={classes.navLink}>
                            <span style={{ display: "flex", alignItems: "center" }} className={classes.navrText}> <CiUser /> My Profile</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink to="/userPage/orders" className={classes.navLink}>
                            <span style={{ display: "flex", alignItems: "center" }} className={classes.navrText}> <CiShoppingBasket /> My Orders</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink to="/userPage/wishlist" className={classes.navLink}>
                            <span style={{ display: "flex", alignItems: "center" }} className={classes.navrText}> <CiViewList /> Wishlist</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink to="/userPage/reviews" className={classes.navLink}>
                            <span style={{ display: "flex", alignItems: "center" }} className={classes.navrText}><CiStar /> My Reviews</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={classes.contentAreaContainer}>
                <div className={classes.contentArea}>
                    {/* <UserWishlist /> */}
                </div>
            </div>
        </div>
    );
}

export default UserLayout;
