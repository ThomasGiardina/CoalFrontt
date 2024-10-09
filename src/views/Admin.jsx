import AdminComponent from "../components/Admin/Admin";

const AdminView = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(27, 40, 56, 0.4), rgba(27, 40, 56, 0.8), rgba(0, 0, 0, 1)), url('/adminBackground.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="absolute inset-0 opacity-95" style={{ backgroundColor: '#1B2838' }}></div>
            <div className="relative z-10">
                <AdminComponent />
            </div>
        </div>
    );
};

export default AdminView;