import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    userPage: {
        display: "flex",
        maxWidth: "1200px",
        margin: "30px 0"
    },
    userNav: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "250px",
        height: "330px",
        backgroundColor: "#BDBDBD",
        boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        borderRadius: "5px",
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "250px",
        marginBottom: "10px",
    },
    userItem: {
        display: "flex",
        flexDirection: "column",
        width: "250px",
    },
    navLink: {
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        padding: "15px 0",
        margin: "0 auto",
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        fontSize: "18px",
        // width: "290px",
        position: "relative",
        "&.active": {
            backgroundColor: "#CCCCCC",
            cursor: "pointer",
        },
        "&::before": {
            content: "''",
            position: "absolute",
            top: "0",
            left: "-20px",
            width: "116%",
            height: "1px",
            backgroundColor: "#737373",
        },
    },
    contentArea: {
        display: "flex",
        maxWidth: "960px",
        border: "1px solid red",
        marginLeft: "30px",
    },
});

export default useStyles;