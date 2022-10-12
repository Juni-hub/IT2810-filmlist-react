import { gql, useQuery } from '@apollo/client'

const GET_FILMS = gql`
    query C {
        getAllPosts {
            title
            year
            cast
        }
    }
`
interface Film {
    title: string,
    year: string,
    cast: string,
}

export default function Films() {
    const { loading, error, data } = useQuery(GET_FILMS)

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
    
    return (
        <div>
            {!loading && !error && 
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Year</th>
                            <th>cast</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getAllPosts.map((post: Film) => (
                            <tr>
                                <td> {post.title} </td>
                                <td> {post.year} </td>
                                <td> {post.cast} </td>       
                            </tr>
                        ))}
                    </tbody>
                </table> }
        </div>
    )
}
