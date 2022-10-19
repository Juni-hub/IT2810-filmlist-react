import { useMutation, useQuery } from '@apollo/client'
import { Button, DatePicker, Select, Col, Card, Row } from 'antd';
import { ADD_FILM, SEARCH_FILMS } from '../queries/filmQueries';
import { setGenre, setTitle, setYear } from '../redux/actions';
import {useDispatch, useSelector} from "react-redux";

import Search from 'antd/lib/input/Search';
import {Store} from "../redux/store";
import moment from 'moment';
import { useState } from 'react';
import { disabledYear, optionList } from '../helpers/helpers';
import { Film } from '../utils/Interface';
import { CollectionCreateForm } from './AddFilm';
import { ShowFilmItem } from './FilmItem';

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
    let title = useSelector ((state: Store) => state.title);
    let genre = useSelector ((state: Store) => state.genre);
    let year = useSelector ((state: Store) => state.year);

    const dispatch = useDispatch();

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
            <Col xs={24} md={6} className="my-4 mx-2">
                <Card hoverable={true} onClick={() => handleClick(post)} title={post.title} style={{textAlign: "center"}} >
                    <p style={{textAlign: "center"}}> Year Released: {post.year? post.year: ""} </p>
                </Card>
            </Col>
        ))
    )

    function useReset() {
        dispatch(setTitle(""))
        dispatch(setGenre(""))
        dispatch(setYear("0"))

        title = useSelector ((state: Store) => state.title);
        genre = useSelector ((state: Store) => state.genre);
        year = useSelector ((state: Store) => state.year);
    }

    return (
        <>
        {!loading && !error && 
            <div className='container m-3 pb-3'>    
                <div className='d-flex pt-2' style={{justifyContent: "center"}}>
                    <div className='px-2'>
                            <Search defaultValue={title? title: undefined} placeholder="Search for title" onSearch={(e) => dispatch(setTitle(e))} style={{ width: 400 }} />
                        </div>
                        <div className='px-2'>
                            <Select defaultValue={genre? genre: undefined} placeholder="Choose a genre" style={{ width: 200 }} onChange={(e) => dispatch(setGenre(e))}>
                                {optionList}
                            </Select>
                        </div>
                        <div className='px-2'>
                            <DatePicker disabledDate={disabledYear} defaultValue={(parseInt(year, 10) !== 0)? moment(year) : undefined} style={{ width: 200 }} placeholder="Choose a year" onChange={(date,dateString) => {dateString === ""? dispatch(setYear("0")) : dispatch(setYear(dateString)) }} picker="year" />
                        </div>
                        <div className='px-2'>
                            <Button
                                type="primary"
                                onClick={useReset}
                            >
                                Reset Filters
                            </Button>
                        </div>
                        <div className='px-2'>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setOpenCreate(true);
                                }}
                            >
                                New Film
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

                    <div className="site-card-wrapper">
                        <Row justify="center" align='middle'>
                            {body}
                        </Row>
                        <ShowFilmItem 
                            film={currentPost} 
                            open={isModalOpen} 
                            onCancel={handleCancel} 
                        />
                    </div>

                    <div className='mt-2 mb-2' style={{textAlign: "center"}}>
                        <Button
                            type='primary'
                            className="m-2"
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
                </div>
            }
        </>
    )
};