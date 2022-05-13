import React from 'react';
import {NavLink} from 'react-router-dom'; 
import { Nav, Container } from 'react-bootstrap';

class Navbar extends React.Component{
    render()
    {
        
        const navStyles= ( {isActive} )=>{
            return {
                fontWeight : isActive?'bold':'normal',
                textDecoration : isActive?'underline':'none',
                color : isActive?'blue':'black'
            }
        }
        return(
            <>
            <Container>
                <nav>
                    <NavLink style={navStyles} to='/'>Home</NavLink>
                    <NavLink style={navStyles} to='/about'>About</NavLink>
                    <NavLink style={navStyles} to='/chart'>Chart</NavLink>
                </nav>
            </Container>
            
            </>
        )
    }
}

export default Navbar;