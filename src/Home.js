import React from 'react'
import Search from './Search'
import Wall from './Wall'

const Home = ({username}) => {
    return <>
        <Search />
        <Wall username={username} />
    </>


}

export default Home



