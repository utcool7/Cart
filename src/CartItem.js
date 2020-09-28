import React from 'react';

class CartItem extends React.Component{
   

    // testing () {

    //     const promise = new Promise((resolve,reject)=>{
    //         setTimeout(()=>{
    //             resolve('done');
    //         },5000)
    //     })
    //     promise.then(()=>{
    //         //setState acts like a synchronus call
    //         this.setState({qty:this.state.qty+10});
    //         this.setState({qty:this.state.qty+10});
    //         this.setState({qty:this.state.qty+10});
    //         console.log('state',this.state);
    //     })
    // }

    //arrow function directly binds this pointer
    increaseQuantity = () => {
        //console.log('this',this.state);
        //set state rerender our component with updated value 
        
        //setState form 1 
        // this.setState(
        //     {
        //         qty : this.state.qty +1 
        //     }
        // );

        //setState Form 2
        this.setState((prevState)=>{
            return{
                qty :prevState.qty +1
            }

        });
    }
    decreaseQuantity = () => {
        
        const {qty} = this.state;
        if(qty === 0)
            return;
        //setState Form 2
        this.setState((prevState)=>{
            return{
                qty :prevState.qty - 1
            }

        });
    }
    render(){
        const {price,title,qty} = this.props.product;
        return (
            <div className="cart-item">
                <div className="left-block">
                    
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={{fontSize:25}}>{title}</div>
                    <div style={{color:'#777'}}>Rs {price}</div>
                    <div style={{color:'#777'}}>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/*Buttons */}
                        <img 
                           alt="increase" 
                           className="action-icons" 
                           src="https://www.flaticon.com/svg/static/icons/svg/992/992651.svg" 
                           onClick={this.increaseQuantity}
                        />
                        <img 
                           alt="decrease" 
                           className="action-icons" 
                           src="https://www.flaticon.com/svg/static/icons/svg/659/659892.svg" 
                           onClick={this.decreaseQuantity}
                        />
                        <img 
                           alt="delete" 
                           className="action-icons" 
                           src="https://www.flaticon.com/svg/static/icons/svg/3096/3096673.svg" 
                         />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    image:{
        height :110,
        width: 110,
        borderRadius:4,
        background: '#ccc'
    }
}
export default CartItem ;
