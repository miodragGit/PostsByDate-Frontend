import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useAlert } from 'react-alert'

import 'react-datepicker/dist/react-datepicker.css';
import '../../../App.css'




const Settings = props => {
    const[categories, setCategories] = useState({categories: []});
    const[pageLimit, setPageLimit] = useState();
    const[date, setDate] = useState();
    const[category, setCategory] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/api/cms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {if(data.message != "Not found."){
            setPageLimit(data.defaultFilter[0].pageLimit);
            setDate(data.defaultFilter[0].date);
            setCategory(data.defaultFilter[0].category);
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
        if (selectedDate != null){
            data.date = selectedDate.toISOString();
        }

        try{
            const response = await fetch('http://localhost:5000/api/cms', {
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
            alert('Default filter saved!')
        }
        catch (err){
            console.log(err);
        }
    };

    const clearDefaultFilter = async () => {
        try{
            const response = await fetch('http://localhost:5000/api/cms/1', {
             method: 'DELETE'
            });

            const responseData = await response.json();
            alert('Default filter deleted!')
        }
        catch (err){
            console.log(err);
        }
    };

    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
   
    const {register, handleSubmit} = useForm();

    useEffect(() => {

    }, [])

    return (
        <div className='myForm'>
            <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
            <Form.Label>Post Limit (per page):</Form.Label>
            <input type='number' value={pageLimit} placeholder="Enter number" name='pageLimit' ref={register}></input>
        </Form.Group>

        <Form.Group>
            <Form.Label>From Date:</Form.Label>
            <DatePicker selected={selectedDate} value={date} onChange={date => setSelectedDate(date)} name='date' ref={register}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Category:</Form.Label>
            <br />
            <select selected={selectedCat} value={category} onChange={cat => setSelectedCat(cat)} name='category' ref={register}>
                <option value='1'>Choose category</option>
                {categories.categories.map((category, idx) => {
                    console.log(category);
                    return (
                        <option key={idx} value={category.id}>
                            {category.title}
                        </option>
                    )
                })}
            </select>
        </Form.Group>
        
        <div>
        <Button className='clearBtn' variant="danger" onClick={clearDefaultFilter}>
            Clear Filter
        </Button>
        <Button variant="primary" type="submit">
            Save
        </Button>
        </div>
        </Form>
        </div>
    ); 
};

export default Settings;