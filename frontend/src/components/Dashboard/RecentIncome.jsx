import { LuArrowBigRight } from 'react-icons/lu';
import moment from 'moment';

import TransactionInfoCard from '../Cards/TransactionInfoCard.jsx';

const RecentIncome = ({ transactions, onSeeMore }) => {
    return (
        <div className='card h-auto'>

            <div className='flex items-center justify-between'>
                <h5 className='text-lg font-medium'>
                    Income
                </h5>

                <button
                    className='card-btn flex items-center gap-1'
                    onClick={onSeeMore}
                >
                    See All
                    <LuArrowBigRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(-5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type="income"
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    );
}

export default RecentIncome