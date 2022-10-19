import { ADD_FILM, SEARCH_FILMS } from '../queries/filmQueries';
import { Button, DatePicker, DatePickerProps, Form, Input, Modal, Select } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client'
import { setGenre, setTitle, setYear } from '../redux/actions';
import {useDispatch, useSelector} from "react-redux";

import { Film } from '../utils/Interface';
import Search from 'antd/lib/input/Search';
import {Store} from "../redux/store";
import moment from 'moment';
import { useState } from 'react';

interface Values {
    title: string;
    description: string;
    modifier: string;
}
  
interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const PAGE_SIZE = 15;
const { Option } = Select;

const optionItems = ["Drama", "Documentary", "Sports", "Silent", "Adventure", "Western", "Romance", "War", "Comedy", "Horror", "Historical", "Animated"]
const optionList: React.ReactNode[] = [];

optionItems.forEach((e) => {
    optionList.push(<Option key={e}>{e}</Option>);
})

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="Insert a new film"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
            form
            .validateFields()
            .then(values => {
                form.resetFields();
                onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
            <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title of the film!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            name="year"
            label="Year"
            >
                <Input />
            </Form.Item>

            <Form.Item
            name="cast"
            label="Cast"
            >
                <Input />
            </Form.Item>

            <Form.Item
            name="genres"
            label="Genres"
            >
            <Select>
                {optionList}
            </Select>
            </Form.Item>
        </Form>
      </Modal>
    );
  };

export default function Films() {
    const [page, setPage] = useState(0);
    const title = useSelector ((state: Store) => state.title);
    const genre = useSelector ((state: Store) => state.genre);
    const year = useSelector ((state: Store) => state.year);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [createPost] = useMutation(ADD_FILM);
    const { loading, error, data } = useQuery(SEARCH_FILMS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
            titleFilter: title,
            genreFilter: genre,
            yearFilter: parseInt(year,10),
        },
    });

    if (loading) {
        return (
            <div className='container'>
                <div className='d-flex justify-content-center mt-3'>
                    <div className='spinner-border' role='status'>
                        <span className='sr-only'></span>
                    </div>
                </div>
            </div>
        )
    }

   if (error) {
        console.log(error)
        return (
            <div className='container'>
                <div className='mt-3'>
                    <p>Something went wrong...</p>
                </div>
            </div>
        )
    }
    
    const onCreate = (values: any) => {
        createPost({
            variables: {
                title: values.title,
                year: values.year? parseInt(values.year, 10) : null,
                cast: values.cast? values.cast.split(",") : null,
                genres: values.genres? [values.genres]: null,
            }
        });
        setOpen(false);
    };

    return (
        <>
        {!loading && !error && 
            <div className='container m-3'>    
                <div className='d-flex pt-4'>
                    <div className='px-2'>
                        <Search  placeholder="Title" defaultValue={title} onSearch={(e) => dispatch(setTitle(e))} style={{ width: 400 }} />
                    </div>
                    <div className='px-2'>
                        <Select value = {genre} style={{ width: 200 }} onChange={(e) => dispatch(setGenre(e))}>
                            {optionList}
                        </Select>
                    </div>
                    <div className='px-2'>
                        <DatePicker defaultValue={(parseInt(year,10) !== 0)? moment(year) : undefined} style={{ width: 200 }} onChange={(date,dateString) => dispatch(setYear(dateString))} picker="year" />
                    </div>
                    <div className='px-2'>
                        <Button
                            type="primary"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            New Film
                        </Button>
                        <CollectionCreateForm
                            open={open}
                            onCreate={onCreate}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        /> 
                    </div>
                </div>
                <table className='table table-hover mt-3 mb-3 pt-2'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Cast</th>
                            <th>Genres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getFilteredPosts?.map((post: Film) => (
                            <tr key={post._id}>
                                <td> {post.title} </td>
                                <td> {post.year? post.year: ""} </td>
                                <td> {post.cast? post.cast.map((el) => el + ", "): ""} </td>  
                                <td> {post.genres? post.genres.map((el) => el + ", "): ""} </td>     
                            </tr>
                        ))}
                    </tbody>
                </table> 
                <div className='mt-2'>
                    <button
                        className="btn btn-primary m-2"
                        id="buttonLoadMore"
                        disabled={loading}
                        onClick={() => (setPage(prev => prev-1))}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary"
                        id="buttonLoadMore"
                        disabled={loading}
                        onClick={() => (setPage(prev => prev+1))}
                    >
                        Next
                    </button>
                </div>
            </div>
        }
        </>
    )
}