import React from 'react'
import { Link } from 'react-router-dom'
import './DrugList.scss'
import pill from '../../assets/icons/pill.png'


function DrugList({ filteredMeds, profileId }) {

    return (
        <div className='drug-list'>
            {filteredMeds.map(med =>
            (<Link
                className='drug-list__link' key={med.id}
                to={`/search/${med.id}`}
                state={{ filteredMeds, profileId }}>
                <div className='drug-list__card' >
                    <img src={pill} alt='pill' />

                   
                    <div className='drug-list__details'>

                        <div className='drug-list__name'>
                            {med.name}

                        </div>
                        <p>
                            <span className="drug-list__detail">Active Ingredient: </span>
                            {med.active_ingredient}</p>

                    </div>
                </div>
            </Link>)
            )}
        </div>

    )
}

export default DrugList