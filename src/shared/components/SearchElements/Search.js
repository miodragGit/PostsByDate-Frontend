import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {useForm} from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import './Search.css';

const Search = props => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const[categories, setCategories] = useState({categories: []});

    useEffect(() => {
        fetch('http://localhost:5000/api/cms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {if(data.message != "Not found." && data.defaultFilter[0].category == '1'){
            setSelectedCat(2);
        }
        });

        fetch('http://localhost:5000/api/posts/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => setCategories(data));
    }, [])

    const onSubmit = async (data) => {
        console.log(selectedDate)
        if (selectedDate != null){
            data.date = selectedDate.toISOString();
        }

        try{
            const response = await fetch('http://localhost:5000/api/posts/filterPosts', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                pageLimit: data.pageLimit,
                date: data.date,
                category: data.category
             })
            });

            const responseData = await response.json();
            props.filterPosts(responseData)
        }
        catch (err){
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setSelectedCat(e.target.value);
    }

    const {register, handleSubmit} = useForm();

    return (
        <Form className='search-form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='input1'>
            <Form.Label>Post Limit (per page):</Form.Label>
            <input type='number' placeholder="Enter number" name='pageLimit' ref={register}></input>
        </Form.Group>

        <Form.Group className='input2'>
            <Form.Label>From Date:</Form.Label>
            <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} ref={register}/>
        </Form.Group>

        <Form.Group className='input3'>
            <Form.Label>Category:</Form.Label>
            {/* <select selected={selectedCat} onChange={cat => setSelectedCat(cat)} name='category' ref={register}> */}
            <select value={selectedCat} onChange={handleChange} name='category' ref={register}>
            <option value='1'>Choose option</option>
            <option value='2'>All categories</option>
                {categories.categories.map((category, idx) => {
                    return (
                        <option key={idx} value={category.id}>
                            {category.title}
                        </option>
                    )
                })}
            </select>
        </Form.Group>

        <Button className='searchBtn' variant="primary" type="submit">
            Search
        </Button>
        </Form>
    ); 
};

export default Search;