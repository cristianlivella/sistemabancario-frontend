import React from 'react';

import { OptionsObject, useSnackbar, WithSnackbarProps } from 'notistack';

interface Props {
    setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<Props> = (props: Props) => {
    props.setUseSnackbarRef(useSnackbar());
    return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
    useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />;
};

const snackbar = {
    success: (msg: string, options: OptionsObject = {}) => {
        snackbar.toast(msg, { ...options, variant: 'success' });
    },
    warning: (msg: string, options: OptionsObject = {}) => {
        snackbar.toast(msg, { ...options, variant: 'warning' });
    },
    info: (msg: string, options: OptionsObject = {}) => {
        snackbar.toast(msg, { ...options, variant: 'info' });
    },
    error: (msg: string, options: OptionsObject = {}) => {
        snackbar.toast(msg, { ...options, variant: 'error' });
    },
    handleApiError: (res: any) => {
        if (!res) return;
        if (res.error) return snackbar.error(res.error);

        Object.keys(res).map((key: string) => {
            return snackbar.error(res[key]);
        });
    },
    toast: (msg: string, options: OptionsObject = {}) => {
        if (useSnackbarRef) {
            useSnackbarRef.enqueueSnackbar(msg, options);
        }
    }
};

export default snackbar;
