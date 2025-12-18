import AccountSettings from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import PaymentSettings from "./PaymentSettings";
import SettingsImage from "./SettingsImage";

const SettingContainer = () => {
    return (
        <div className="flex justify-center items-center min-h-screen pt-12 sm:pt-20 px-4 sm:px-6" >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 max-w-[1350px] w-full min-h-[1300px]">
                <div className="flex flex-col space-y-6 sm:space-y-10">
                    <SettingsImage className="rounded-lg shadow-lg" />
                    <PaymentSettings className="rounded-lg shadow-lg" />
                    
                </div>
                <div className="flex flex-col space-y-6 sm:space-y-10">
                    <AccountSettings className="rounded-lg shadow-lg" />
                    <ChangePassword className="rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default SettingContainer;
