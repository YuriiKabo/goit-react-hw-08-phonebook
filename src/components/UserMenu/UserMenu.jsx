import { Button, Container, Typography} from "@mui/material";
import { Box } from "@mui/system";
import { CustomNavLink } from "components/MuiCustom.styled";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "redux/Authorisation/operations";

export function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authorisation.user.name);

    return (
        <Container sx={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <CustomNavLink to='/contacts'>Contacts</CustomNavLink>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography sx={{ mr: '20px' }}>Welcome, {user}</Typography>
                <Button variant="contained" type="button" onClick={() => dispatch(LogOut())}>Logout</Button>
            </Box>
        </Container>
    );
};