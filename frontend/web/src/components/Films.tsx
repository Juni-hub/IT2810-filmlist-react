import { useMutation, useQuery } from '@apollo/client'
import { WrapText } from '@mui/icons-material';
import { Button, DatePicker, DatePickerProps, Select, Col, Card, Row, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import { useState } from 'react';
import { SEARCH_FILMS, ADD_FILM } from '../queries/filmQueries';
import { Film } from '../utils/Interface';
import { CollectionCreateForm } from './AddFilm';

const PAGE_SIZE = 15;
const { Option } = Select;

const optionItems = ["Drama", "Documentary", "Sports", "Silent", "Adventure", "Western", "Romance", "War", "Comedy", "Horror", "Historical", "Animated"]
const optionList: React.ReactNode[] = [];

optionItems.forEach((e) => {
    optionList.push(<Option key={e}>{e}</Option>);
})

export default function Films() {
    const [page, setPage] = useState(0);
    const [filterInput, setFilterInput] = useState<String>("");
    const [titleFilter, setTitleFilter] = useState<String>("");
    const [genreFilter, setGenreFilter] = useState<String>("");
    const [yearFilter, setYearFilter] = useState(0);
    const [open, setOpen] = useState(false);

    const [createPost] = useMutation(ADD_FILM);
    const { loading, error, data } = useQuery(SEARCH_FILMS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
            titleFilter: titleFilter,
            genreFilter: genreFilter,
            yearFilter: yearFilter,
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
        setYearFilter(0);
        setGenreFilter("");
        setTitleFilter("");

        createPost({
            variables: {
                title: values.title,
                year: values.year? parseInt(values.year, 10) : null,
                cast: values.cast? values.cast.split(",") : null,
                genres: values.genres? [values.genres]: null,
            }
        });
        setTitleFilter(values.title);
        setOpen(false);
    };

    const handleFilterInput = (input: string) => {
        setFilterInput(input);
    };

    const changeTitle = () => {
        setTitleFilter(filterInput);
        setGenreFilter("");
        setYearFilter(0);
    };

    const changeGenre = (value: string) => {
        setGenreFilter(value);
        setTitleFilter("");
        setYearFilter(0);
    };

    const changeDate: DatePickerProps['onChange'] = (date, dateString) => {
        setYearFilter(parseInt(dateString, 10))
        setTitleFilter("");
        setGenreFilter("");
    };

    let body: any = [];

    body.push (
        data.getFilteredPosts?.map((post: Film) => (
            <Col xs={24} md={6} className="my-4 mx-2">
                <Card title={post.title} style={{textAlign: "center"}} >
                    <p style={{textAlign: "center"}}> {post.year? post.year: ""} </p>
                </Card>
            </Col>
        ))
    )

    return (
        <>
        {!loading && !error && 
            <div className='container m-3'>    
                <div className='d-flex pt-4'>
                    <div className='px-2'>
                        <Search defaultValue={titleFilter !== ""? titleFilter.toString(): undefined} placeholder="input search text" onChange={(e) => handleFilterInput(e.target.value)} onSearch={changeTitle} style={{ width: 400 }} />
                    </div>
                    <div className='px-2'>
                        <Select defaultValue={genreFilter !== ""? genreFilter.toString(): undefined} style={{ width: 200 }} onChange={changeGenre}>
                            {optionList}
                        </Select>
                    </div>
                    <div className='px-2'>
                        <DatePicker defaultValue={(yearFilter !== 0)? moment(yearFilter.toString()) : undefined} style={{ width: 200 }} onChange={changeDate} picker="year" />
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

                <div className="site-card-wrapper">
                    <Row justify="center" align='middle'>
                        {body}
                    </Row>
                </div>



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