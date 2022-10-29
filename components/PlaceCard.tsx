import { TypePlace } from '../types';

interface Props {
    place: TypePlace;
}

const PlaceCard = ({ place }: Props): JSX.Element => {
    const { name } = place.fields;

    return <div>{name}</div>;
};

export default PlaceCard;
