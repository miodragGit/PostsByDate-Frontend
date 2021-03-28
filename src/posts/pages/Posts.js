import React, { useState, useEffect } from 'react';
import PostsList from '../components/PostsList';
import Search from '../../shared/components/SearchElements/Search';
import Pagination from '../../shared/components/Pagination/Pagination';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [renderPagination, setRenderPagination] = useState(true);

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('http://localhost:5000/api/posts');

            const responseData = await response.json();

            setPosts(responseData.posts);

            if (responseData.pageLimit == null){
                setPostsPerPage(5);
            }
            else{
                setPostsPerPage(responseData.pageLimit);
            }

            if (responseData.posts.length > responseData.pageLimit)
                setRenderPagination(true);
            else
                setRenderPagination(false);
        };
        sendRequest();
    }, []); 

    const filterPosts = (response) => {
        setPosts(response.posts);

        if (response.pageLimit == ''){
            setPostsPerPage(5);
        }
        else{
            setPostsPerPage(response.pageLimit);
        }

        if (response.posts.length > response.pageLimit)
            setRenderPagination(true);
        else
            setRenderPagination(false);
    }

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Search filterPosts={filterPosts} />  
            <PostsList items={currentPosts} />
            {renderPagination ? (<Pagination 
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate} 
            />) : null}
            {/* <Pagination 
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate} 
            /> */}
        </div>
       
    );
};

export default Posts;