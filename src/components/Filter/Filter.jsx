import { useDispatch } from 'react-redux';
import { getFlter } from 'redux/Filter/slice';
import { Box, TextField } from '@mui/material';


export function Filter() {
    const dispatch = useDispatch()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                ml: 'auto',
                mr: 'auto',
            }}>
            <TextField
                name="filter"
                type="text"
                label="Find contacts by name"
                id="standard-basic"
                variant="standard"
                disabled={false}
                onChange={(e) => dispatch(getFlter(e.target.value))}
            />
        </Box>
    );
};
