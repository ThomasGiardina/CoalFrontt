import { useEffect } from 'react';
import Storegrid from '../components/Store/StoreGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../redux/slices/gamesSlice';

const Store = () => {
    const dispatch = useDispatch();
    const { items: games, loading } = useSelector((state) => state.games);

    useEffect(() => {
        if (games.length === 0) dispatch(fetchGames());
    }, [dispatch, games.length]);

    return (
        <div className="w-full">
            <Storegrid games={games} />
        </div>
    );
};

export default Store;