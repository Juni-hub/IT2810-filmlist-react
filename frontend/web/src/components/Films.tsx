import { ADD_FILM, SEARCH_FILMS } from '../queries/filmQueries';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Row, Select } from 'antd';
import { disabledYear, optionList } from '../helpers/helpers';
import { setGenre, setSorting, setTitle, setYear } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from '@apollo/client'
import { CreateForm } from './AddFilm';
import { Film } from '../utils/Interface';
import Search from 'antd/lib/input/Search';
import { ShowFilmItem } from './FilmItem';
import {Store} from "../redux/store";
import moment from 'moment';
import { useState } from 'react';

const { Option } = Select;
const PAGE_SIZE = 15;

/** 
* Main component to show list of filmitems on React application
*/
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

    let title = useSelector ((state: Store) => state.title); //fetching title filter from redux store
    let genre = useSelector ((state: Store) => state.genre); //fetching genre filter from redux store
    let year = useSelector ((state: Store) => state.year); //fetching year filter from redux store
    let sorting = useSelector ((state: Store) => state.sorting); //fetching sorting filter from redux store
    
    /** 
    * Retrieves data, loading and error from graphql server
    * @param variables to be considered when retreiving data
    * @return data from graphql server 
    */
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
                <p className='px-4'>Loading...</p>
            </div>
        )
    }

   if (error) {
        console.log(error)
        return (
            <div className='container mt-3'>
                <h5 style={{color: "#ffffff"}}>Something went wrong when trying to connect to the server...</h5>
            </div>
        )
    }

    /** 
    * Creates a filmitem in the database
    * @param film to be created
    */
    const onCreate = (film: any) => { 
        createPost({
            variables: {
                title: film.title,
                year: film.year? parseInt(film.year, 10) : null,
                cast: film.cast? film.cast.split(",") : [],
                genres: film.genres? [film.genres]: [],
            }
        });
        dispatch(setTitle(film.title))
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

    /** 
    * Resets the filters in redux
    */
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
            <div className='container m-3 pb-4 mt-2 mb-2' style={{textAlign: "center"}}>    
                <div className='d-flex flex-wrap' style={{justifyContent: "center"}}>
                    <div className='px-2 pb-3'>
                        <Search 
                            id='search'
                            value={title? title: undefined} 
                            placeholder="Search for title" 
                            onSearch={(e) => dispatch(setTitle(e))} 
                        />
                    </div>
                    <div className='px-2 pb-3'>
                        <Select 
                            id='genre'
                            value={genre? genre: undefined} 
                            placeholder="Search for genre" 
                            onChange={(e) => dispatch(setGenre(e))}
                        >
                            {optionList}
                        </Select>
                    </div>
                    <div className='px-2 pb-3'>
                        <DatePicker 
                            id='year'
                            disabledDate={disabledYear} 
                            value={(parseInt(year, 10) !== 0)? moment(year) : undefined} 
                            placeholder="Choose a year"
                            picker="year" 
                            onChange={(date, dateString) => {dateString === ""? dispatch(setYear("0")) : dispatch(setYear(dateString))}} 
                        />
                    </div>
                    <div className='px-2 pb-3'>
                        <Select 
                            id='sort'
                            placeholder={"Sort on year"} 
                            onChange={(e) => dispatch(setSorting(e))}
                        >
                            <Option value="1"><ArrowUpOutlined /> Ascending</Option>
                            <Option value="-1"><ArrowDownOutlined /> Descending</Option>
                        </Select>
                    </div>
                    <div className='px-2 pb-3'>
                        <Button 
                            type="primary"
                            onClick={useReset}
                        >
                            Reset Filters
                        </Button>
                    </div>
                    <div className='px-2 pb-3'>
                        <Button
                            id='addFilm'
                            type="primary"
                            onClick={() => {
                                setOpenCreate(true);
                            }}
                        >
                            Add New Film
                        </Button>
                        <CreateForm
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