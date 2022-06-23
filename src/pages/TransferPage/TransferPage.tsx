import { useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import snackbar from '../../common/utils/snackbar';

const TransferPage = () => {
    const [fromAccountId, setFromAccountId] = useState('');
    const [toAccountId, setToAccountId] = useState('');
    const [amount, setAmount] = useState(0.0);

    const [oldFromAccountId, setOldFromAccountId] = useState('');
    const [oldToAccountId, setOldToAccountId] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>({});

    const getData = useCallback(() => {
        if (fromAccountId.length !== 20) {
            return snackbar.error('L\'identificativo dell\'account mittente deve essere lungo 20 caratteri.');
        }

        if (toAccountId.length !== 20) {
            return snackbar.error('L\'identificativo dell\'account destinatario deve essere lungo 20 caratteri.');
        }

        setIsLoading(true);

        setOldFromAccountId(fromAccountId);
        setOldToAccountId(toAccountId);

        fetch('http://localhost:5000/api/transfer/', {
            body: JSON.stringify({
                from: fromAccountId,
                to: toAccountId,
                amount
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200 || res.status === 204) {
                res.json().then(json => setData(json));
                snackbar.success('Trasferimento effettuato con successo!');
            } else {
                res.json().then(json => {
                    snackbar.error(json.error ?? 'Si è verificato un errore sconosciuto');
                });
                setData({});
            }
        }).catch(() => {
            snackbar.error('Si è verificato un errore sconosciuto');
            setData({});
        }).finally(() => {
            setIsLoading(false);
        });
    }, [fromAccountId, toAccountId, amount]);

    return (
        <>
            <Typography variant='h3'>Effettua trasferimento</Typography>

            <div style={{maxWidth: '400px'}}>
                <TextField
                    label='Identificativo conto mittente'
                    variant='outlined'
                    value={fromAccountId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromAccountId(e.target.value)}
                    style={{display: 'block', marginTop: '8px'}}
                    inputProps={{ maxLength: 20 }}
                    disabled={isLoading}
                    fullWidth />

                <TextField
                    label='Identificativo conto destinatario'
                    variant='outlined'
                    value={toAccountId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToAccountId(e.target.value)}
                    style={{display: 'block', marginTop: '8px'}}
                    inputProps={{ maxLength: 20 }}
                    disabled={isLoading}
                    fullWidth />

                <TextField
                    label='Importo'
                    variant='outlined'
                    type='number'
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
                    style={{display: 'block', marginTop: '8px'}}
                    inputProps={{ maxLength: 20, }}
                    disabled={isLoading}
                    fullWidth />
                </div>

            <Button
                variant='contained'
                color='primary'
                onClick={getData}
                disabled={isLoading}
                style={{display: 'block', marginTop: '8px'}}
            >
                Effettua trasferimento
            </Button>

            {data?.id !== undefined && (
                <Alert severity='success' style={{maxWidth: '500px', marginTop: '16px'}}>
                    <AlertTitle>Trasferimento effettuato!</AlertTitle>
                    <p>
                        <strong>Id transazione:</strong> {data.id}
                    </p>
                    <p>
                        <strong>Nuovo saldo mittente:</strong> €{parseFloat(data.balances[oldFromAccountId]).toFixed(2)}
                    </p>
                    <p>
                        <strong>Nuovo saldo destinatario:</strong> €{parseFloat(data.balances[oldToAccountId]).toFixed(2)}
                    </p>
                </Alert>
            )}


        </>
    );
};

export default TransferPage;
