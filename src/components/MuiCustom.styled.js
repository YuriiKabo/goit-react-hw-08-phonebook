import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const CustomNavLink = styled(NavLink)`
font-weight:500;
padding: 15px ;
text-decoration:none;
margin-right:20px;
color: green;
&.active{
    color:white;
    border-bottom:5px solid white;
}
&:hover{
color:black;
}
`;