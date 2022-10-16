import { gql, useQuery } from '@apollo/client'
import { DatePicker, DatePickerProps, Select } from 'antd';
import Search from 'antd/lib/input/Search';
import { useState } from 'react';
import { SEARCH_FILMS } from '../queries/filmQueries';
import { Film } from '../utils/Interface';

const PAGE_SIZE = 10;

export default function Films() {
    const [page, setPage] = useState(0);
    const [filterInput, setFilterInput] = useState<String>("");
    const [titleFilter, setTitleFilter] = useState<String>("");
    const [genreFilter, setGenreFilter] = useState<String>("")
    const [yearFilter, setYearFilter] = useState(0)
    const { Option } = Select;

    const handleFilterInput = (input: string) => {
        setFilterInput(input);
    };

    const search = () => {
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
        console.log(date, Number(dateString))
        const number = parseInt(dateString, 10)
        setYearFilter(number)
        setTitleFilter("");
        setGenreFilter("");
    };

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

    return (
        <>
        {!loading && !error && 
            <div className='container m-3'>    
            <Search placeholder="input search text" onChange={(e) => handleFilterInput(e.target.value)} onSearch={search} style={{ width: 400 }} />
            <div className='d-flex pt-4'>
                <div>
                    <Select defaultValue="" style={{ width: 120 }} onChange={changeGenre}>
                        <Option value="Drama">Drama</Option>
                        <Option value="Documentary">Documentary</Option>
                        <Option value="Sports">Sports</Option>
                        <Option value="Silent">Silent</Option>
                        <Option value="Adventure">Adventure</Option>
                        <Option value="Western">Western</Option>
                        <Option value="Romance">Romance</Option>
                        <Option value="War">War</Option>
                        <Option value="Comedy">Comedy</Option>
                        <Option value="Horror">Horror</Option>
                        <Option value="Historical">Historical</Option>
                        <Option value="Animated">Animated</Option>
                        <Option value="ShortDocumentary">ShortDocumentary</Option>
                    </Select>
                </div>
                <div className='px-4 d-flex'>
                    <DatePicker onChange={changeDate} picker="year" />
                </div>
            </div>
            <table className='table table-hover mt-3 mb-3'>
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
                            <td> {post.year} </td>
                            <td> {post.cast.map((el) => el + ", ")} </td>  
                            <td> {post.genres.map((el) => el + ", ")} </td>     
                        </tr>
                    ))}
                </tbody>
            </table> 
            <div className='text-center'>
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