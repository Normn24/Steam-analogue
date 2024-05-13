import { NavLink } from "react-router-dom";
import { CiUser, CiViewList, CiShoppingBasket, CiStar } from "react-icons/ci";
import useStyles from "./UserStyles";

const UserLayout = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.userPage}>
            <div className={classes.userInfo}>
                <p>User Name</p>
                <p>User Mail</p>
            </div>
            <div className={classes.userNav}>
                <div className={classes.navItem}>
                    <NavLink to="/userPage/profile" className={classes.navLink}>
                        <span style={{ display: "flex", alignItems: "center" }}> <CiUser /> My Profile</span>
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to="/userPage/orders" className={classes.navLink}>
                        <span style={{ display: "flex", alignItems: "center" }}> <CiShoppingBasket /> My Orders</span>
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to="/userPage/wishlist" className={classes.navLink}>
                        <span style={{ display: "flex", alignItems: "center" }}> <CiViewList /> Wishlist</span>
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to="/userPage/reviews" className={classes.navLink}>
                        <span style={{ display: "flex", alignItems: "center" }}><CiStar /> My Reviews</span>
                    </NavLink>
                </div>
            </div>
            <div className={classes.contentArea}>
                {children}
            </div>
        </div>
    );
}

export default UserLayout;
