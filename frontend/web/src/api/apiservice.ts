
const requestBody = {
    query: `
        mutation {
            getAllPosts {
                title
                year
                cast
            }
        }`
};

export default function getData() {
    fetch('http://localhost:4000/graphql', {
        method: 'GET',
        body: JSON.stringify(requestBody),
        headers: {
            'content-Type': 'application/json'
        }
    })
}