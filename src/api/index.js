const backendDomain = "http://localhost:8080/"

const summaryApi = {
    addBook : {
        url : `${backendDomain}add-book`,
        method : 'post'
    },
    getAllBooks : {
        url : `${backendDomain}all-books`,
        method : 'post'
    },
    deleteBook : {
        url : `${backendDomain}delete-book`,
        method : 'post'
    }
}

export default summaryApi