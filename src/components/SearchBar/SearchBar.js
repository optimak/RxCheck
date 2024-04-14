import { useState, useEffect } from 'react';

import "./SearchBar.scss"

function SearchBar({ data, onFilter }) {


    const [searchQuery, setSearchQuery] = useState('');
    const [filterByDrugFunction, setFilterByDrugFunction] = useState('');

    useEffect(() => {
        const filterData = () => {
            const drugFunctionKeywords = [["diabetes"], ["heart ", "blood pressure"], ["depression", "anxiety", "nerve", "adhd"], ["pain", "inflammation"], ["gerd", "inflammation"]];
            let filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.active_ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.indications.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filterByDrugFunction !== "") {
                let keywords = drugFunctionKeywords[Number(filterByDrugFunction)];
                filtered = filtered.filter(item =>
                    item.indications && keywords.some(keyword =>
                        item.indications.toLowerCase().includes(keyword.toLowerCase())
                    )
                );
            }

            onFilter(filtered);
        };
        filterData();
    }, [data, filterByDrugFunction, onFilter, searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterByDrugFunction = (value) => {
        setFilterByDrugFunction(value);
    };

    const handleShowAll = () => {
        setFilterByDrugFunction("");
    };

    return (
        <div className="search-bar-container">
             <input type="text" value={searchQuery} onChange={handleSearchInputChange} className="search-input" placeholder="Search Drug or Condition.." />
            <div className="button-group">
                <button className={`filter-button ${filterByDrugFunction === "" ? "active" : ""}`} onClick={handleShowAll}>All</button>
                <button className={`filter-button ${filterByDrugFunction === "0" ? "active" : ""}`} onClick={() => handleFilterByDrugFunction("0")}>Glucose Regulators</button>
                <button className={`filter-button ${filterByDrugFunction === "1" ? "active" : ""}`} onClick={() => handleFilterByDrugFunction("1")}>Heart & Pressure Meds</button>
                <button className={`filter-button ${filterByDrugFunction === "2" ? "active" : ""}`} onClick={() => handleFilterByDrugFunction("2")}>Mind & Nerve Care</button>
                <button className={`filter-button ${filterByDrugFunction === "3" ? "active" : ""}`} onClick={() => handleFilterByDrugFunction("3")}>Inflammation & Pain Relief</button>
                <button className={`filter-button ${filterByDrugFunction === "4" ? "active" : ""}`} onClick={() => handleFilterByDrugFunction("4")}>Digestive Aids</button>
            </div>
           
        </div>
    );
}

//     const [searchQuery, setSearchQuery] = useState('');
//     const [filterByDrugFunction, setFilterByDrugFunction] = useState('');






//     useEffect(() => {
//         const filterData = () => {
//             const drugFunctionKeywords =
//                 [["diabetes"], ["heart ", "blood pressure"],
//                 ["depression", "anxiety", "nerve", "adhd"], ["pain", "inflammation"], ["gerd", "inflammation"]]
//             let filtered = data.filter(item =>
//                 item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 item.active_ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 item.indications.toLowerCase().includes(searchQuery.toLowerCase())
//             );

//             if (filterByDrugFunction) {
//                 let keywords = drugFunctionKeywords[Number(filterByDrugFunction)];
//                 filtered = filtered.filter(item =>
//                     item.indications && keywords.some(keyword =>
//                         item.indications.toLowerCase().includes(keyword.toLowerCase())
//                     )
//                 );

//             }



//             onFilter(filtered);


//         };
//         filterData()

//     },[data, filterByDrugFunction, onFilter,searchQuery]);

//     const handleSearchInputChange = (event) => {
//         setSearchQuery(event.target.value);
//         // filterData();
//     };




//     const handleFilterByDrugFunctionChange = (event) => {
//         setFilterByDrugFunction(event.target.value);
//     };

//     const handleSearchClick = () => {

//         // filterData();
//     };




//     return (
//         <div className="search-bar-container">
//             <select value={filterByDrugFunction} onChange={handleFilterByDrugFunctionChange} className="select-box">
//                 <option value="">Filter By Drug Function</option>
//                 <option value="0">Glucose Regulators</option>
//                 <option value="1">Heart & Pressure Meds</option>
//                 <option value="2">Mind & Nerve Care</option>
//                 <option value="3">Inflammation & Pain Relief</option>
//                 <option value="4">Digestive Aids</option>
//             </select>
//             <input type="text" value={searchQuery} onChange={handleSearchInputChange} className="search-input" placeholder="Search Drug or Condition.." />


//             {/* <button className="search-button" onClick={handleSearchClick}>Search</button> */}
//         </div>
//     );
// }

export default SearchBar;
