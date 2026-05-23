import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className='flex items-center gap-5 bg-white p-6 rounded-3xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

            <div className={`size-14 flex items-center justify-center rounded-2xl text-[26px] text-white shadow-lg ${color}`}>
                {icon}
            </div>

            <div className='flex flex-col'>
                <h6 className='text-sm font-medium text-gray-500'>
                    {label}
                </h6>

                <span className='text-2xl font-bold text-gray-900 tracking-tight'>
                    ${value}
                </span>
            </div>

        </div>
    );
};

export default InfoCard;