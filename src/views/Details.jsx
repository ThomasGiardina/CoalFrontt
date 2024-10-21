import ContainerDetails from "../components/Details/ContainerDetails";

const Details = () => {
    return (
        <div 
            className="relative  flex items-center justify-center bg-background"
            style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <ContainerDetails />
        </div>
    );
}

export default Details;
