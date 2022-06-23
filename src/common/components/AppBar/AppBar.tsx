import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AppTitleContainer, StyledAppBar } from './styled';

const AppBar = () => {
    return (
        <StyledAppBar>
            <Toolbar>
                <AppTitleContainer center={false}>
                    <Typography variant='h6' noWrap>
                        Sistema Bancario
                    </Typography>
                </AppTitleContainer>
            </Toolbar>
        </StyledAppBar>
    );

};

export default AppBar;
