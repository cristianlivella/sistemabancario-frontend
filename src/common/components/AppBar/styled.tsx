import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components/macro';

export const AppTitleContainer = styled.div<{center: boolean}>`
    ${props => props.center ? 'margin: 0 auto !important;' : ''}
`;

export const StyledAppBar = styled(AppBar)`
    z-index: ${props => props.theme.zIndex.drawer + 1} !important;
`;
