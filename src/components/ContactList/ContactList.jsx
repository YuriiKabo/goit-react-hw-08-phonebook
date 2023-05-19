import { Box, List, Typography } from '@mui/material';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/Contacts/api';


export function ContactList () {
    const { data } = useGetContactsQuery();
   
    const filter = useSelector(state => state.filter);
     if(!data)return
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = data.filter(({ name }) => {
        return name.toLowerCase().includes(normalizedFilter);
    });

    return (
        data.length > 0 ?
        <Box sx={{ width: 'auto' }}>
            <Typography variant="h3">Contacts [{data.length}]</Typography>
            <List>
                {filteredContacts.map(({ name, number, id }, index) => {
                    return <ContactListItem
                        index={index}
                        array={filteredContacts}
                        key={id}
                        name={name}
                        number={number}
                        id={id}
                    />
                }
                )}
            </List>
            </Box> :
          <Typography variant="h3">There is no contacts yet</Typography>  
    );
};
