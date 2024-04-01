import './SearchPage.scss';
import DrugList from '../../components/DrugList/DrugList'
import { useOutletContext } from 'react-router-dom';


function SearchPage() {
    const { filteredMeds } = useOutletContext();

    return (
        <div className="search__list">
            <DrugList filteredMeds={filteredMeds} />
        </div>
    )
}

export default SearchPage