import AccountSettings from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import PaymentSettings from "./PaymentSettings";
import SettingsImage from "./SettingsImage";

const SettingContainer = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F1012] via-[#141517] to-[#0F1012] pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                        <span className="bg-gradient-to-r from-[#FF6828] to-[#E57028] bg-clip-text text-transparent">
                            Configuración
                        </span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                        Administra tu perfil, métodos de pago y seguridad de tu cuenta
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                        <SettingsImage />
                        <PaymentSettings />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                        <AccountSettings />
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingContainer;
