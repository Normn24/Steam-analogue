import { styled, Container, Paper } from '@mui/material';

export const ScrollableContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* IE 11 */
    // '&::-webkit-scrollbar': {
    //   display: 'none', /* Hide scrollbar for Chrome, Safari, and Opera */
    // },
});

export const StyledPaper = styled(Paper)({
    padding: '20px',
    textAlign: 'center',
    height: '100%',
    border: '1px solid #ccc', // Border style
});
