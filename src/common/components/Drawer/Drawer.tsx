import { NavLink } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { DrawerContainer, StyledDrawer, StyledToolbar } from './styled';

const Drawer = () => {
    const width = window.location.pathname.startsWith('/admin') ? 260 : 240;

    return (
        <DrawerContainer show={true} width={width}>
            <StyledDrawer variant='permanent' width={width}>
                <StyledToolbar />
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto'}}>
                    <>
                        <ListItem
                            to={'/'}
                            exact={true}
                            component={NavLink}
                            activeClassName='Mui-selected'
                            button >
                            <ListItemText primary={'Homepage'} />
                        </ListItem>
                        <ListItem
                            to={'/transfer'}
                            exact={true}
                            component={NavLink}
                            activeClassName='Mui-selected'
                            button >
                            <ListItemText primary={'Trasferimento'} />
                        </ListItem>
                    </>
                </div>
            </StyledDrawer>
        </DrawerContainer>
    );
};

export default Drawer;
