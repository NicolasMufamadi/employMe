import { Link } from "react-router-dom"
import styled from "styled-components"

const SideMenuLink = styled(Link)`
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 22px;

    &:hover {
        cursor: pointer;
        background: #252831;
        border-left: 4px solid #C2EDCE;
        color: #C2EDCE
      }
`;

const Label = styled.span`
  margin-left: 16px
`

export default function SideMenu({item,isOpen}){
 
    return(
        <>
            
            <SideMenuLink to={item.path} onClick={isOpen}>
                <div>
                    {item.icon}
                    <Label>{item.title}</Label>
                </div>
            </SideMenuLink>
        </>
    )
    
}