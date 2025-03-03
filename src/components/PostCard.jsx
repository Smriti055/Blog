import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={databaseService.getFilePreview(featuredImage)} alt={title}  className='rounded-xl'/>

        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
        <button className='border-b rounded-xl bg-green-500 p-2 mt-2'>Click to read more.</button>
        </div>
       
    </Link>
  )
}

export default PostCard