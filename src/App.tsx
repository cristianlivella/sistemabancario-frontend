import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'styled-components';

import { SnackbarUtilsConfigurator } from './common/utils/snackbar';
import Router from './Router';

const App = () => {
    const theme = createMuiTheme();

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} autoHideDuration={5000} maxSnack={10}>
                        <SnackbarUtilsConfigurator />
                            <Router />
                    </SnackbarProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    );
};

export default App;
