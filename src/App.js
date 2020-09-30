import React from 'react';
import Cart from './cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
  
      constructor(){
        super();
        this.state ={
        products : [],
        loading : true 

        //     {
        //     price:99,
        //     title:'Watch',
        //     qty: 1,
        //     img:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1359&q=80',
        //     id : 1 
        // },
        // {
        //     price:999,
        //     title:'Mobile Phone',
        //     qty: 10,
        //     img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        //     id : 2
        // },
        // {
        //     price:9999,
        //     title:'Laptop',
        //     qty: 4,
        //     img:'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        //     id :3
        // }
    
    }
        
    }
    
    componentDidMount(){
      firebase
          .firestore()
          .collection('products')
          .get()
          .then((snapshot) => {

            //gives snapshot of the particular db at that time 
            console.log(snapshot);

            //get the data 
            snapshot.docs.map((doc)=>{
              
              console.log(doc.data())
            })

            const products = snapshot.docs.map((doc)=>{
              //getting the data as object inside the doc 
              const data = doc.data();
              data['id'] = doc.id;
              return data;
            })
            this.setState({
              products:products,
              loading:false
            })
          })

    }

    handleIncreaseQuantity = (product) => {
        console.log('Heyy please increase the quantity of',product);
        const {products} = this.state;
        const index = products.indexOf(product);

        products[index].qty += 1;

        this.setState({
            products
        })
    }
    handleDecreaseQuantity = (product) => {
        console.log('Heyy please decrease the quantity of',product);
        const {products} = this.state;
        const index = products.indexOf(product);
        if(products[index].qty === 0)
            return;
        products[index].qty -= 1;

        this.setState({
            products
        })
    }
    handleDeleteProduct = (id) => {
        const{products} = this.state;
        // excludes item having id == id 

        const items = products.filter((item) => item.id !== id);
        this.setState({
            products: items
        })
    }
    getCartCount = () =>{
      const{products} = this.state;
      let count = 0;
      
      products.forEach((product) => {

        count += product.qty;
        
      });
      return count ;
    }
    getCartTotal = () =>{
      const {products} = this.state;

      let cartTotal = 0;

      products.map((product) => {
        if(product.qty > 0)
            cartTotal = cartTotal + product.qty * product.price;
        return '';    
      })

      return cartTotal;
    }
  render(){
    const{products,loading} = this.state;
  return (
    <div className="App">
      <Navbar count = {this.getCartCount()}/>
      <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
      />
      {loading && <h1>Loading product...</h1>}
      <div style={{padding:10, fontSize:20}}>TOTAL : {this.getCartTotal()}</div>
    </div>
  );
  }
}



export default App;
