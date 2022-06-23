import { useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import snackbar from '../../common/utils/snackbar';

const typeMapping = {
    deposit: 'deposito',
    withdrawal: 'prelievo',
    transfer: 'trasferimento'
};

const HomePage = () => {
    const [accountId, setAccountId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>({});

    const getData = useCallback(() => {
        if (accountId.length !== 20) {
            return snackbar.error('L\'identificativo dell\'account deve essere lungo 20 caratteri.');
        }

        setIsLoading(true);

        fetch('http://localhost:5000/api/account/' + accountId + '?detailed ').then(res => {
            if (res.status === 200 || res.status === 204) {
                res.json().then(json => setData(json));
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
    }, [accountId]);

    return (
        <>
            <Typography variant='h3'>Ricerca conto corrente</Typography>

            <TextField
                label='Identificativo conto'
                variant='outlined'
                value={accountId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountId(e.target.value)}
                style={{display: 'block', marginTop: '8px'}}
                inputProps={{ maxLength: 20 }}
                disabled={isLoading} />

            <Button
                variant='contained'
                color='primary'
                onClick={getData}
                disabled={isLoading}
                style={{display: 'block', marginTop: '8px'}}
            >
                Ricerca conto
            </Button>

            {data?.name !== undefined && (
                <>
                    <Typography variant='h5' style={{marginTop: '24px'}}>Informazioni conto</Typography>

                    <TableContainer component={Paper} style={{maxWidth: '400px', margin: '16px 0'}}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Nome</strong></TableCell>
                                    <TableCell>{data.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Cognome</strong></TableCell>
                                    <TableCell>{data.surname}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Saldo</strong></TableCell>
                                    <TableCell>€{parseFloat(data.balance).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            {data?.transactions !== undefined && (
                <>
                    <Typography variant='h5' style={{marginTop: '24px'}}>Elenco transazioni</Typography>

                    <TableContainer component={Paper} style={{margin: '16px 0'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>tipo</TableCell>
                                    <TableCell>conto destinatario</TableCell>
                                    <TableCell>importo</TableCell>
                                    <TableCell>data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.transactions.map((transaction: any) => (
                                    <TableRow>
                                        <TableCell>{transaction.id}</TableCell>
                                        <TableCell>{typeMapping[transaction.type as keyof typeof typeMapping]}</TableCell>
                                        <TableCell>{transaction.account_to}</TableCell>
                                        <TableCell>€{parseFloat(transaction.amount).toFixed(2)}</TableCell>
                                        <TableCell>{transaction.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
};

export default HomePage;
