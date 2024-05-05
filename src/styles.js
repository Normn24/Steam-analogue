import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    itemPaper: {
        display: 'flex',
        width: 1200,
        margin: '0 auto',
        padding: '10px',
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
        margin: '5px',
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
        height: '479px',
        objectFit: 'cover',
        borderRadius: "6px",
    },
    genreContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '5px',
        margin: '13px 0px 13px 0px',
    },
    genreItem: {
        backgroundColor: '#cccc',
        padding: '2px 5px',
        borderRadius: '3px',
    },
    carouselRoot: {
        width: 1340,
        margin: '0 auto',
    },
});
