import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    itemPaper: {
        display: 'flex',
        maxWidth: 1220,
        margin: '0 auto',
        padding: '15px',

        "@media (max-width: 960px)": {
            padding: '10px'
        },
    },
    imgContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        marginRight: '20px',

        "@media (max-width: 960px)": {
            display: "none",
        },
    },
    imgItem: {
        margin: '5px 5px 5px 0',
        width: '200px',
        height: '135px',
        objectFit: 'cover',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        borderRadius: "6px",
        '&:hover': {
            transform: 'scale(0.9)',
        },
    },
    description: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textTransform: "capitalize",
        lineHeight: "0.9",

        "@media (max-width: 960px)": {
            fontSize: "3vw ",
        }
    },
    title: {
        margin: "0 0 16px",
        fontSize: "42px",
        "@media (max-width: 960px)": {
            fontSize: "34px ",
            margin: "0 0 6px",
        },
    },


    fullSizeImage: {
        width: '100%',
        height: '470px',
        objectFit: 'cover',
        borderRadius: "6px",
        "@media (max-width: 960px)": {
            height: "270px",
        },
    },
    genreContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '5px',
        margin: '14px 0px 0px',
        "@media (max-width: 960px)": {
            margin: "10px 0 0",
        },
    },
    genreItem: {
        backgroundColor: '#cccc',
        padding: '2px 5px',
        borderRadius: '3px',
    },
    carouselRoot: {
        width: 1440,
        marginTop: "40px",
        marginLeft: "-81px",

        "@media (max-width: 960px)": {
            margin: "20px auto 0",
            maxWidth: "100%",
            paddingTop: "20px"
        },
    },
    buttonsSlider: {
        opacity: 1,
        background: "none",
        borderRadius: 0,
        color: "#000",
        fontSize: "80px",

    }
});
