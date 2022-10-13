import { gql, useQuery } from '@apollo/client'
import Search from 'antd/lib/input/Search';
import { useState } from 'react';
import { GET_FILMS } from '../queries/filmQueries';
import { Film } from '../utils/Interface';

const PAGE_SIZE = 10;

export default function Films() {
    const[page, setPage] = useState(0);

    const { loading, error, data } = useQuery(GET_FILMS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
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
        return (
            <div className='container'>
                <div className='mt-3'>
                    <p>Something went wrong...</p>
                </div>
            </div>
        )
    }

    const onSearch = (value: string) => console.log(value);

    return (
        <>
        {!loading && !error && 
            <div className='container m-3'>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 400 }} />
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
                        {data.getAllPosts.map((post: Film) => (
                            <tr key={post._id}>
                                <td> {post.title} </td>
                                <td> {post.year} </td>
                                <td> {post.cast.map((el) => el)} </td>  
                                <td> {post.genres.map((el) => el)} </td>     
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