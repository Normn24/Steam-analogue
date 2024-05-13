import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    userPage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "250px",
        height: "330px",
        backgroundColor: "#BDBDBD",
        boxShadow: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        borderRadius: "5px",
        margin: "30px"
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "10px",
    },
    userNav: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    navLink: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px 0",
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        fontSize: "18px",
        position: "relative",
        "&:active": {
            backgroundColor: "lightblue",
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
});

export default useStyles;