import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components/macro';

const getDrawerStyle = (width: number) => `
    @media (min-width: 960px) {
        width: ${width}px;
        flex-shrink: 0;
    }
`;

export const DrawerContainer = styled.nav<{show: boolean, width: number}>`
    ${props => getDrawerStyle(props.width)}
    ${props => props.show ? '' : 'display: none;'}
`;

export const StyledDrawer = styled(Drawer)<{width: number}>`
    ${props => getDrawerStyle(props.width)}
    & > .MuiPaper-root {
        width: ${props => props.width}px;
        height: 100%;
        overflow: hidden;
    }
`;

export const StyledToolbar = styled(Toolbar)`
    ${props => props.theme.mixins.toolbar}
`;
