import { useState, useEffect } from 'react';

import "./SearchBar.scss"

function SearchBar({ data, onFilter }) {
    const [searchQuery, setSearchQuery] = useState('');
    // const [sortBy, setSortBy] = useState('');
    const [filterByDrugFunction, setFilterByDrugFunction] = useState('');
    console.log(data, "DDD")
    const drugFunctionKeywords =
        [["diabetes"], ["heart ", "blood pressure"],
        ["depression", "anxiety", "nerve", "adhd"], ["pain", "inflammation"], ["gerd", "inflammation"]]




    useEffect(() => {
        filterData();
        // handleSearchClick()

    }, [searchQuery, filterByDrugFunction]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // const handleSortChange = (event) => {
    //     setSortBy(event.target.value);
    // };


    const handleFilterByDrugFunctionChange = (event) => {
        setFilterByDrugFunction(event.target.value);
    };

    const handleSearchClick = () => {
        filterData();
    };

    const filterData = () => {
        let filtered = data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.active_ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.indications.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filterByDrugFunction) {
            let keywords = drugFunctionKeywords[Number(filterByDrugFunction)];
            filtered = filtered.filter(item =>
                item.indications && keywords.some(keyword =>
                    item.indications.toLowerCase().includes(keyword.toLowerCase())
                )
            );
            
        }



        onFilter(filtered);

        console.log(data)
        console.log(filtered)
    }


    return (
        <div className="search-bar-container">
            <select value={filterByDrugFunction} onChange={handleFilterByDrugFunctionChange} className="select-box">
                <option value="">Filter By Drug Function</option>
                <option value="0">Glucose Regulators</option>
                <option value="1">Heart & Pressure Meds</option>
                <option value="2">Mind & Nerve Care</option>
                <option value="3">Inflammation & Pain Relief</option>
                <option value="4">Digestive Aids</option>
            </select>
            <input type="text" value={searchQuery} onChange={handleSearchInputChange} className="search-input" placeholder="Search Drug or Condition.." />


            <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default SearchBar;
