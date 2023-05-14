import './quotes.css'
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

export default function Quotes() {


  
   


    const list = [{ id: 1, type: "success" }, { id: 2, type: "learning" },
    { id: 3, type: "inspirational" }, { id: 4, type: "happiness" },
    { id: 5, type: "dreams" }, { id: 6, type: "faith" }, { id: 7, type: "change" },
    { id: 8, type: "attitude" }, { id: 9, type: "courage" }, { id: 10, type: "failure" }]


    useEffect(()=>{
          
        async function fetchQuotes(){
        
            try {
                
                const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',{
                    method: "GET",
                    headers:{'X-Api_Key': config.key.apiKey}
                })
                
                console.log(await response)

            } catch (error) {
                
            }
        }
        fetchQuotes();

    },[])


    const ListItems = list.map((item) =>
        <div key={item.id} >
            <li className="listItem">
                {item.type}
            </li>
        </div>
    )

    return (
        <div>
            <h1>Stay motivated</h1>
            <div className="row">
                <div className='col-sm-3'>
                    <div className='card'>
                        <div className="card border border-info" >
                            <div className="card-header">
                                Quotes
                            </div>
                            <div className="list-group">
                                <ul>
                                    {ListItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-sm-8'>
                    <div className='card' style={{ marginTop: '5rem' }}>
                        <div className='card-header'>
                            Quote
                        </div>
                        <div className='card-body'>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                            </blockquote>
                        </div>
                        <div className='card-footer text-muted'>
                            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                <button className='btn me-md-2'>
                                    <FontAwesomeIcon icon={faThumbsUp} color='blue'/>
                                </button>
                                <button className='btn me-md-2'>
                                    <FontAwesomeIcon icon={faHeart} color='red' />
                                </button>
                                <button className='btn me-md-2 btn3'>
                                    <FontAwesomeIcon icon={faThumbsDown} color='black' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}