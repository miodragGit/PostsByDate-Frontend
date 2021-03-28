import React from 'react';

import './PostsList.css';
import PostItem from './PostItem';

const PostsList = props => {
    // if (props.items.length === 0){
    //     return (
    //         <div className='center'>
    //             <h2>No posts found.</h2>
    //         </div>
    //     );
    // }

    return (
        <ul className='list-group mb-4'>
            {props.items.map(post => (
                <PostItem 
                    key={post.id} 
                    id={post.id} 
                    title={post.title} 
                    description = {post.description}
                    date = {post.date}
                    category = {post.category}
                />
            ))}
        </ul>
    );
};

export default PostsList;