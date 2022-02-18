import React,{Fragment, useEffect, useState} from 'react';
import MetaData from './layouts/MetaData';

import Loader from './layouts/Loader';
import {useDispatch, useSelector} from 'react-redux'

import {getProducts} from '../actions/productActions';
import Product from "./product/Product";

import Pagination from 'react-js-pagination';

import { useAlert } from 'react-alert';
const Home = ()=>{
    const [currentPage, setCurrentPage] = useState();

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, products, error, productsCount, resPerPage} = useSelector(state => state.products)


    useEffect(()=>{
        if(error){
            alert.success('Success');
            console.log(error);
            alert.error(error);
        }
        dispatch(getProducts());
        
        
    },[dispatch,alert, error])

    function setCurrentpageNo(pageNumber){
        setCurrentPage(pageNumber)
    }

    return(
        <Fragment>
        {loading?<Loader/>:(
            <Fragment>
            <MetaData title={'Buy Best Products Online'}/>
            <h1 id='product_heading'>Latest Products</h1>
            
            <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.map(product=>(
                        <Product key={product._id} product={product}/>
                    ))}
                </div>
            </section>
            <div className='d-flex justify-content-center mt-5'>
                        <Pagination 
                            activePage={currentPage} 
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productsCount}
                            onChange = {setCurrentpageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'} 
                            lastPageText={'Last'}
                            itemClass='page-item'
                            linkClass='page-link'   
                            
                        />
            </div>
            </Fragment>
        )}
            
        </Fragment>
    )
}


export default Home;