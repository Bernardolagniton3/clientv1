import React, { Fragment  } from 'react'
 
const CardName = (props) => {


    return (
        <Fragment>
                <Fragment>
         
                    <h1 id="products_heading">Landing Page</h1>
                    <ul key={props.key}>
                     <div>{props.familyName}</div>
                     <div>{props.gender}</div>
                     <div>{props.title}</div>
                   
                     
                           
                    </ul>
                   
                     
                </Fragment>
        </Fragment>
    )
}
export default CardName
