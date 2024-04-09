import './SearchPage.scss';
import DrugList from '../../components/DrugList/DrugList'
import { useOutletContext } from 'react-router-dom';


function SearchPage() {
    const { filteredMeds,profileId } = useOutletContext();

    return (
        <div className="search__list">
            <DrugList filteredMeds={filteredMeds} profileId={profileId} />
        </div>
    )
}

export default SearchPage