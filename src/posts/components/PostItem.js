import React from 'react';
import { Badge } from 'react-bootstrap';
import './PostItem.css'

const PostsItem = props => {
    return (
        <li className='list-group-item'>
            <div>
                <div>
                    <Badge className='badge' variant="secondary">{props.date}</Badge>
                    <Badge variant="secondary">{props.category.title}</Badge>
                    <h2>{props.title}</h2>
                    <h3>{props.description}</h3>
                </div>
            </div>
        </li>
    );
};

export default PostsItem;