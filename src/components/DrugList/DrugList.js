import React from 'react'
import { Link } from 'react-router-dom'
import './DrugList.scss'


function DrugList({ filteredMeds, profileId }) {
    console.log(profileId)
    console.log(filteredMeds)
    return (
        // <div>DrugList</div>
        <div className='drug-list'>
            {filteredMeds.map(med =>
            (<Link 
                className='drug-list__link' 
            to={`/search/${med.id}`}
                state={{ filteredMeds,profileId }}>
                <div className='drug-list__card' key={med.id}>

                    {/* {med.indications} */}
                    <div className='drug-list__name'>
                        {med.name}

                    </div>

                    <div className='drug-list__details'>


                        <p>
                            <span className="drug-list__detail">Active Ingredient: </span>
                            {med.active_ingredient}</p>
                        {/* <p>
                            <span className="drug-list__detail">Indications: </span>
                            {med.indications}</p> */}
                        {/* <p>
                            <span className="drug-list__detail">Side Effects: </span>
                            {med.side_effects}</p>
                        <p>
                            <span className="drug-list__detail">Warning: </span>
                            Always condult your doctor.</p> */}
                    </div>
                </div>
            </Link>)
            )}
        </div>

    )
}

export default DrugList