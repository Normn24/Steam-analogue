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
        width: "250px",
        height: "350px",
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
    navrText: {
        marginLeft: "15px",
    },
    navLink: {
        display: "flex",
        padding: "15px 0",
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        fontSize: "18px",
        position: "relative",
        "&.active": {
            backgroundColor: "#CCCCCC",
            cursor: "pointer",
            borderRadius: "5px",
        },
        "&::before": {
            content: "''",
            position: "absolute",
            top: "0",
            left: "0px",
            width: "100%",
            height: "1px",
            backgroundColor: "#737373",
        },
    },
    contentArea: {
        display: "flex",
        maxWidth: "960px",
        // border: "1px solid red",
        marginLeft: "30px",
    },
});

export default useStyles;