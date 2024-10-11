import StatisticsContainer from "../components/Statistics/StatisticsContainer";

const Statistics = () =>{
    return(
        <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(27, 40, 56, 0.4), rgba(27, 40, 56, 0.8), rgba(0, 0, 0, 1)), url('/adminBackground.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <StatisticsContainer />
        </div>
    )
}

export default Statistics;