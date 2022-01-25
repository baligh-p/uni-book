import React from 'react'
import Loading from "./Loading"
const Advertice = () => {
    return (
        <React.Fragment>
            <h1 className="paragraphName">Uni<br/>Book</h1>
                <p className="description">
                   Advertise your Books <br/>
                   Find your book to read <br/>
                   Advice people which books they should read<br/>
                </p>
            <Loading/>
        </React.Fragment>
    )
}
export default Advertice