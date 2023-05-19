import { Container } from '@mui/material';
import { CirclesWithBar } from 'react-loader-spinner';

export function Loader() {
    return (
        <Container sx={{p:'40px',opacity:'.6'}}
        ><CirclesWithBar
                height="50%"
                width="50%"
                color="#11790f"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
            />
        </Container>
    );
};