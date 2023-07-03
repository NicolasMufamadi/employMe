import './quotes.css'

import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import config from '../../config';


export default function Quotes() {

    


    const list = [{ id: 1, type: "Success" }, { id: 2, type: "Learning" },
    { id: 3, type: "Inspirational" }, { id: 4, type: "Happiness" },
    { id: 5, type: "Dreams" }, { id: 6, type: "Faith" }, { id: 7, type: "Change" },
    { id: 8, type: "Attitude" }, { id: 9, type: "Courage" }, { id: 10, type: "Failure" }]
    const [quote,setQuote] = useState({});
    const [date,setDate] = useState(new Date().getDate());

    useEffect(()=>{

        
        const random = Math.floor(Math.random() * list.length)
        //console.log(list[random].type)
             fetch('https://api.api-ninjas.com/v1/quotes?category='+list[random].type,{
                    method: "GET",
                    headers:{
                               'X-Api-Key': config.key.apiKey,
                               
                            }
                }).then(res => res.json())
                .then(data => setQuote(data[0]))
                .catch(err=>{
                    console.log(err);
                })

    },[date])

    const  getQuote = (quoteType) => {

        fetch('https://api.api-ninjas.com/v1/quotes?category='+quoteType,{
            method: "GET",
            headers: {'X-Api-Key': config.key.apiKey}
        }).then(res => res.json())
        .then(data => setQuote(data[0]))
        .catch(err=>{
            console.log(err)
        })
    }
    

    const ListItems = list.map((item) =>
        <div key={item.id} >
            <li className="listItem" onClick={()=>getQuote(item.type)}>
                {item.type}
            </li>
        </div>
    )

    return (
        <div>
            <h1 className='text-center'>Stay motivated</h1>
            <div className="row">
                <div className='col-sm-3'>
                    <div className='card'>
                        <div className="card border border-info" >
                            <div className="card-header text-center">
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
                        <div className='card-header text-center'>
                            {quote.category}
                        </div>
                        <div className='card-body'>
                            <blockquote className="blockquote mb-0">
                                <p>"{quote.quote}"</p>
                                <footer className="blockquote-footer">{ quote.author }</footer>
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