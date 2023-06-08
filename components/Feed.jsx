'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => {
        return (<PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
         />)
      })}
    </div>
  )
}

function Feed() {
const [searchText, setSearchText] = useState(' ')
const [posts, setPosts] = useState([])

useEffect(()=>{
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setPosts(data)
  }

  fetchPosts()
},[])

const handlerChangeSearchText = (e) => {

}

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input 
        type='text'
        value={searchText}
        onChange={handlerChangeSearchText}
        placeholder='Search for a tag or a username'
        required
        className='search_input peer'/>
      </form>
      <PromptCardList 
      data={posts}
      handleTagClick={()=>{

      }}/>
    </section>
  )
}

export default Feed