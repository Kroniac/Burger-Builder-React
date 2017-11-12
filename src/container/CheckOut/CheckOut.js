import React , {Component} from 'react'
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary"

class CheckOut extends Component {
state = {
    ingredients: {
        cheese:1,
        salad:1,
        bacon:1,
        meat:1
    }
}
    render(){
    return(
        <div>
            <CheckOutSummary ingredients={this.state.ingredients}/>
            </div>
    )
}
}

export default CheckOut;