import { LuTrendingUpDown } from "react-icons/lu";
import CARD_2 from '../../assets/images/card2.png';
import ThemeToggle from './ThemeToggle.jsx';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-shell flex min-h-screen">
            <div className="auth-main relative flex min-h-screen w-screen flex-col px-6 pb-10 pt-6 sm:px-10 md:w-[60vw] md:px-12 md:pt-8">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold tracking-tight font-Unbounded">Flow Ledger</h2>
                    <ThemeToggle />
                </div>
                <div className="flex flex-1 flex-col">
                    {children}
                </div>
            </div>

            <aside className="auth-visual relative hidden min-h-screen w-[40vw] overflow-hidden p-8 md:block">
                <div className="auth-shape auth-shape--one absolute -left-5 -top-7 h-48 w-48 rounded-[2.5rem]" />
                <div className="auth-shape auth-shape--two absolute -right-10 top-[30%] h-48 w-48 rounded-[2.5rem] border-[20px]" />
                <div className="auth-shape auth-shape--three absolute -bottom-7 -left-5 h-48 w-48 rounded-[2.5rem]" />

                <div className="relative z-10 grid grid-cols-1">
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="A clearer view of your finances."
                        value="Your next step starts here"
                    />
                </div>

                <img
                    src={CARD_2}
                    alt="Flow Ledger dashboard preview"
                    className="auth-preview absolute bottom-10 z-10 w-64 rounded-2xl shadow-2xl lg:w-[90%]"
                />
            </aside>
        </div>
    );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value }) => (
    <div className="auth-stat-card relative z-10 flex gap-4 rounded-2xl p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl text-white shadow-lg">
            {icon}
        </div>
        <div>
            <h6 className="app-muted mb-1 text-xs">{label}</h6>
            <span className="text-lg font-semibold">{value}</span>
        </div>
    </div>
);
