import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    itemPaper: {
        display: 'flex',
        width: 1220,
        margin: '0 auto',
        padding: '15px',
    },
    imgContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        marginRight: '20px',
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
        lineHeight: "0.9"
    },
    fullSizeImage: {
        width: '100%',
        height: '470px',
        objectFit: 'cover',
        borderRadius: "6px",
    },
    genreContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '5px',
        margin: '14px 0px 0px',
    },
    genreItem: {
        backgroundColor: '#cccc',
        padding: '2px 5px',
        borderRadius: '3px',
    },
    carouselRoot: {
        width: 1440,
        marginTop: "40px", marginLeft: "-81px"
    },
    buttonsSlider: {
        opacity: 1,
        background: "none",
        borderRadius: 0,
        color: "#000",
        fontSize: "80px",
    }
});
