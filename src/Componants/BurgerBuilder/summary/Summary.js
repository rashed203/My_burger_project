import React from 'react'

export const Summary = (props) => {
    const summary=props.ingrediant.map(item=>{
        return(
            <li key={item.type}>
                <span style={{textTransform:"capitalize"}}>{item.type}</span>: {item.amount}
            </li>
        )
    })
    return (
        <div>
            {summary}
        </div>
    )
}
