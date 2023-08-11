import { useState } from "react"
import styled from "styled-components";

const Link = styled.a`
   text-decoration: none;
   border: 1px black solid;
   border-radius: 100%;
   text-align: center;
   padding: 10px;
   margin-right: 10px;

   &hover:{

   }
`

export default function Pagination({totalData,itemsPerPage}) {

    const pages = [1,2,3,4];  

    for(let i = 1; i < Math.ceil(totalData/itemsPerPage); i++){
        pages.push(i);
    }
   
   return(
    <nav aria-label="navigation">
        <ul className="pagination justify-content-center">
        {
           pages.map((page) => (
             <li key={page} className="page-item">
                <Link>
                    {page}
                </Link>
             </li>
           ))    
       }
        </ul>      
    </nav>
   )
}