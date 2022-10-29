import { TypePlace } from '../types';
import PlaceCard from './PlaceCard';

interface Props {
    places: TypePlace[];
}

const PlacesList = ({ places }: Props): JSX.Element => {
    return (
        <div>
            {places.map((place) => (
                <PlaceCard key={place.sys.id} place={place} />
            ))}
        </div>
    );
};

export default PlacesList;
