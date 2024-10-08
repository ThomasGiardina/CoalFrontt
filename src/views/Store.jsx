import '../index.css';
import Gamefilter from '../components/Gamefilter/gamefilter';
import Carrousel from '../components/Carrousel/Carrousel';
import Storegrid from '../components/Grids/StoreGrid';

function Store() {
  return (
    <>
      <Carrousel />
      <div className="flex flex-col md:flex-row ml-8 space-y-4 md:space-y-0 md:space-x-20 max-w-[1800px] mb-10">
        <Gamefilter />
        <div className="flex-1">
          <Storegrid /> 
        </div>
      </div>
    </>
  );
}

export default Store;
