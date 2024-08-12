import AccessBank from "@/src/assets/images/Access-bank.png"
import GtBank from "@/src/assets/images/GTbank.png"
import Kuda from "@/src/assets/images/kuda.png"
import CashPoint from "@/src/assets/images/CashPoint.png"

export const TransactionHistoryData: TransactionHistory[] = [
    {
        transaction_id: '1',
        date: 'June 23.12:02pm',
        transaction_partner: 'Jane Doe',
        amount: '200',
        icon_image: CashPoint,
        transactionType:'Credit'
    },
    {
        transaction_id: '2',
        date: 'June 23.12:02pm',
        transaction_partner: 'John Doe',
        amount: '200',
        icon_image: GtBank,
        transactionType:'Credit'
    },
    {
        transaction_id: '3',
        date: 'June 23.12:02pm',
        transaction_partner: 'Joan Doe',
        amount: '100',
        icon_image: Kuda,
        transactionType:'Debit'
    },
    {
        transaction_id: '4',
        date: 'June 23.12:02pm',
        transaction_partner: 'Jen Doe',
        amount: '200',
        icon_image: AccessBank,
        transactionType:'Credit'
    }
];
