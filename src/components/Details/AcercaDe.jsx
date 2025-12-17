import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const AcercaDe = ({ descripcion }) => {
    return (

        <div className="flex w-full flex-col border-opacity-50">
            <ReactMarkdown className="text-xl font-bold text-white">{`**Acerca de este Juego**`}</ReactMarkdown>
            <p className="mt-4 text-white text-lg">
                {descripcion}
            </p>
        </div>
    )

};

AcercaDe.propTypes = {
    descripcion: PropTypes.string,
};

export default AcercaDe;
