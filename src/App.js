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
    
    }
        this.db = firebase.firestore();
    }
    
    componentDidMount(){
      // firebase
      //     .firestore()
      //     .collection('products')
      //     .get()
      //     .then((snapshot) => {

      //       //gives snapshot of the particular db at that time 
      //       console.log(snapshot);

      //       //get the data 
      //       snapshot.docs.map((doc)=>{
              
      //         console.log(doc.data())
      //       })

      //       const products = snapshot.docs.map((doc)=>{
      //         //getting the data as object inside the doc 
      //         const data = doc.data();
      //         data['id'] = doc.id;
      //         return data;
      //       })
      //       this.setState({
      //         products:products,
      //         loading:false
      //       })
      //     })

      firebase
          .firestore()
          .collection('products')
          .onSnapshot((snapshot) => { //onSnapshot acts as listener whenever anything changes
             // in our product collection 

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

        // products[index].qty += 1;

        // this.setState({
        //     products
        // })

        const docRef = this.db.collection('products').doc(products[index].id);

        docRef
            .update({
              qty: products[index].qty + 1
            })
            .then(() => {
              console.log('Updated successfully')
            })
            .catch((error) => {
              console.log('Error:',error);
            })
    }
    handleDecreaseQuantity = (product) => {
        console.log('Heyy please decrease the quantity of',product);
        const {products} = this.state;
        const index = products.indexOf(product);
        if(products[index].qty === 0)
            return;
        // products[index].qty -= 1;

        // this.setState({
        //     products
        // })

        const docRef = this.db.collection('products').doc(products[index].id);

        docRef
            .update({
              qty: products[index].qty - 1
            })
            .then(() => {
              console.log('Updated successfully')
            })
            .catch((error) => {
              console.log('Error:',error);
            })
    }
    handleDeleteProduct = (id) => {
        const{products} = this.state;
        // // excludes item having id == id 

        // const items = products.filter((item) => item.id !== id);
        // this.setState({
        //     products: items
        // })

        const docRef = this.db.collection('products').doc(id);

        docRef
           .delete()
           .then(()=> {
             console.log('Deleted successfully')
           })
           .catch((error) => {
             console.log('Error:',error);
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
  addProduct = () =>{
    firebase
        .firestore()
        .collection('products')
        .add({
          img : '',
          price : 900,
          qty : 3,
          title:'washing machine'
        })
        .then((docRef)=>{
          console.log('product has been added',docRef);
        })
        .catch((error)=>{
          console.log('Error :',error);
        })

  }  
  render(){
    const{products,loading} = this.state;
  return (
    <div className="App">
      <Navbar count = {this.getCartCount()}/>
      {/*<button onClick={this.addProduct} style={{padding: 20 , fontSize : 20} }>Add a product</button>*/}
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
