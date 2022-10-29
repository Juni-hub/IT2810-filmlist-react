import { ADD_FILM, SEARCH_FILMS } from '../queries/filmQueries';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Row, Select } from 'antd';
import { disabledYear, optionList } from '../helpers/helpers';
import { setGenre, setSorting, setTitle, setYear } from '../redux/actions';
import {useDispatch, useSelector} from "react-redux";
import { useMutation, useQuery } from '@apollo/client'

import { CollectionCreateForm } from './AddFilm';
import { Film } from '../utils/Interface';
import Search from 'antd/lib/input/Search';
import { ShowFilmItem } from './FilmItem';
import {Store} from "../redux/store";
import moment from 'moment';
import { useState } from 'react';

const { Option } = Select;
const PAGE_SIZE = 15;

export default function Films() {
    const [page, setPage] = useState(0);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentPost, setCurrentPost] = useState<Film>({
        _id: "",
        title: "",
        year: "",
        cast: [""],
        genres: [""]
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const dispatch = useDispatch();
    const [createPost] = useMutation(ADD_FILM);

    let title = useSelector ((state: Store) => state.title);
    let genre = useSelector ((state: Store) => state.genre);
    let year = useSelector ((state: Store) => state.year);
    let sorting = useSelector ((state: Store) => state.sorting);
    
    const { loading, error, data } = useQuery(SEARCH_FILMS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
            titleFilter: title,
            genreFilter: genre,
            yearFilter: parseInt(year, 10),
            sorting: parseInt(sorting, 10),
        },
    });

    if (loading) {
        return (
            <div className='container d-flex justify-content-center mt-3'>
                <div className='spinner-border' role='status'>
                    <span className='sr-only'></span>
                </div>
            </div>
        )
    }

   if (error) {
        console.log(error)
        return (
            <div className='container mt-3'>
                <p>Something went wrong...</p>
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
        dispatch(setTitle(values.title))
        setOpenCreate(false);
    };

    function handleClick(post: Film) {
        setCurrentPost(post);
        setIsModalOpen(true);
    }
    
    let body: any = [];
    body.push (
        data.getFilteredPosts?.map((post: Film) => (
            <Col xs={22} md={6} className="my-4 mx-2">
                <Card hoverable={true} onClick={() => handleClick(post)} title={post.title}>
                    <p>Year Released: {post.year? post.year: ""}</p>
                </Card>
            </Col>
        ))
    )

    function useReset() {
        dispatch(setTitle(""))
        dispatch(setGenre(""))
        dispatch(setYear("0"))
        dispatch(setSorting("1"))

        title = "";
        genre = useSelector ((state: Store) => state.genre);
        year = useSelector ((state: Store) => state.year);
        sorting = useSelector ((state: Store) => state.sorting);
    }

    return (
        <>
        {!loading && !error && 
            <div className='container m-3 pb-3 mt-2 mb-2' style={{textAlign: "center"}}>    
                <div className='d-flex flex-wrap' style={{justifyContent: "center"}}>
                    <div className='px-2 pb-2'>
                        <Search 
                            data-testid = "searchField"
                            id='search'
                            value={title? title: undefined} 
                            placeholder="Search for title" 
                            onSearch={(e) => dispatch(setTitle(e))} 
                        />
                    </div>
                    <div className='px-2 pb-2'>
                        <Select 
                            data-testid = "genre"
                            id='genre'
                            value={genre? genre: undefined} 
                            placeholder="Search for genre" 
                            onChange={(e) => dispatch(setGenre(e))}
                        >
                            {optionList}
                        </Select>
                    </div>
                    <div className='px-2 pb-2'>
                        <DatePicker 
                            data-testid = "year"
                            id='year'
                            disabledDate={disabledYear} 
                            value={(parseInt(year, 10) !== 0)? moment(year) : undefined} 
                            placeholder="Choose a year"
                            picker="year" 
                            onChange={(date, dateString) => {dateString === ""? dispatch(setYear("0")) : dispatch(setYear(dateString))}} 
                        />
                    </div>
                    <div className='px-2 pb-2'>
                        <Select 
                            id='sort'
                            placeholder={"Sort on year"} 
                            onChange={(e) => dispatch(setSorting(e))}
                        >
                            <Option value="1"><ArrowUpOutlined /> Ascending</Option>
                            <Option value="-1"><ArrowDownOutlined /> Descending</Option>
                        </Select>
                    </div>
                    <div  className='px-2 pb-2'>
                        <Button
                            data-testid="reset"
                            type="primary"
                            onClick={useReset}
                        >
                            Reset Filters
                        </Button>
                    </div>
                    <div className='px-2 pb-2'>
                        <Button
                            id='addFilm'
                            type="primary"
                            onClick={() => {
                                setOpenCreate(true);
                            }}
                        >
                            Add New Film
                        </Button>
                        <CollectionCreateForm
                            open={openCreate}
                            onCreate={onCreate}
                            onCancel={() => {
                                setOpenCreate(false);
                            }}
                        /> 
                    </div>
                </div>

                <Row justify="center" align='middle'>
                    {body}
                </Row>

                <ShowFilmItem 
                    film={currentPost} 
                    open={isModalOpen} 
                    onCancel={handleCancel} 
                />

                <Button
                    type='primary'
                    className="mx-2"
                    id="buttonLoadMore"
                    disabled={loading}
                    onClick={() => (setPage(prev => prev-1))}
                >
                    Previous
                </Button>

                <Button
                    type='primary'
                    id="buttonLoadMore"
                    disabled={loading}
                    onClick={() => (setPage(prev => prev+1))}
                >
                    Next
                </Button>
            </div>
        }
        </>
    )
};