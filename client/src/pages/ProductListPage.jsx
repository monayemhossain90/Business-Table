import React, {Fragment, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {GetProductList} from "../APIRequest/APIRequest";
import {useSelector} from "react-redux";

const ProductListPage = () => {

    // Set initial state of perPage & searchKeyword
    const [perPage,setPerPage] = useState(5);
    const [searchKeyword,setSearchKeyword] =useState("0");

    // Load product data using API request
    useEffect(()=>{
        GetProductList(1,perPage,searchKeyword)
    },[perPage])

    // Load product data using page  click
        const handlePageClick =(event)=>{
            GetProductList(event.selected+1,perPage,searchKeyword)
        }

    // Load product data by per page on change
        const perPageOnChange =(e)=>{
            setPerPage(parseInt(e.target.value));
            GetProductList(1,e.target.value,searchKeyword)
        }

    // Load product data by search Keyword On Change
        const searchKeywordOnChange =(e)=>{
            setSearchKeyword(e.target.value);
            if (e.target.value===0){
                setSearchKeyword("0")
                GetProductList(1,perPage,"0")
            }
        }

    // Load product data by search button
        const searchData =()=>{
            GetProductList(1,perPage,searchKeyword)
        }

    //  Assign product data from redux state

        let AllProduct = useSelector((state)=>state.product.AllProduct);
        let Total = useSelector((state)=>state.product.Total);
        console.log(AllProduct);
        console.log("total "+Total)


    return (<Fragment>
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <h5>My Product List</h5>
                                    </div>
                                    <div className="col-2">
                                        <select
                                            className="form-control mx-2
                                            form-select-sm form-select
                                            form-control-sm"
                                            onChange={perPageOnChange}
                                        >
                                            <option value="5">5 Per Page</option>
                                            <option value="10">10 Per Page</option>
                                            <option value="20">20 Per Page</option>
                                            <option value="30">30 Per Page</option>
                                            <option value="50">50 Per Page</option>
                                            <option value="100">100 Per Page</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Search.."
                                                aria-label="Recipient's username"
                                                aria-describedby="button-addon2"
                                                onChange={searchKeywordOnChange}
                                            />
                                            <button
                                                onClick={searchData}
                                                className="btn  btn-outline-primary btn-sm mb-0"
                                                type="button">Search
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/*  table row start */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive data-table">
                                            <table className="table">
                                                <thead className="sticky-top bg-white">
                                                <tr>
                                                    <th className="text-uppercase text-secondary
                                                    text-xxs font-weight-bolder opacity-7">
                                                        Product
                                                    </th>
                                                    <th className="text-uppercase text-secondary
                                                     text-xxs font-weight-bolder opacity-7">
                                                        Price
                                                    </th>
                                                    <th className="text-uppercase text-secondary
                                                     text-xxs font-weight-bolder opacity-7">
                                                        Stock
                                                    </th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Code
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {/*mapping  product data */}
                                                {
                                                    AllProduct.map((item,i)=>(
                                                            <tr >
                                                                <td>
                                                                    <div className="d-flex px-2 py-1">
                                                                        <div>
                                                                            <img src={item.image} className="avatar me-3" alt="Product"/>
                                                                        </div>
                                                                        <div
                                                                            className="d-flex flex-column justify-content-center">
                                                                            <h6 className="mb-0  text-xs">
                                                                                {item.title}
                                                                            </h6>
                                                                            <p className="text-xs  text-secondary mb-0">
                                                                                {item.category}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="text-xs font-weight-bold mb-0">
                                                                        {item.brand}
                                                                    </p>
                                                                    <p className="text-xs  text-secondary mb-0">
                                                                        {item.price} Taka{""}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p className="badge  bg-gradient-success">
                                                                        {item.stock}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                        <span className="text-secondary text-xs font-weight-bold">
                                                                {item.product_code}
                                                        </span>
                                                                </td>
                                                            </tr>
                                                    ))
                                                }

                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                    {/*  table row end  */}

                                    {/*    page navigation start*/}
                                    <div className="col-12 mt-4 ">

                                            <nav aria-label="Page navigation example" className="bg-gradient-faded-success p-2">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Total/perPage}
                                                    marginPagesDisplayed={3}
                                                    pageRangeDisplayed={5}
                                                    onClick={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                    </div>
                                    {/*    page navigation end*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>);
};

export default ProductListPage;