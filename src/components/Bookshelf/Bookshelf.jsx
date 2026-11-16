import { useState } from 'react';

function Bookshelf() {
    const [books, setBooks] = useState([])
    const [newBook, setNewBook] = useState({ title: '', author: '' })
    const [errors, setErrors] = useState({ title: '', author: '' })

    const formIsInvalid = Object.values(errors).some(Boolean);
    const formHasMissingData = !Object.values(newBook).every(Boolean);

    function checkForErrors({ target }) {
        if (target.name === 'title') {
            setErrors({
                ...errors, title: target.value.length < 2 ? 'The title cannot be less then 2 characters' : ''
            })
        }
        if (target.name === 'author') {
            setErrors({
                ...errors, author: target.value.length < 3 ? 'The author cannot be less then 3 characters' : ''
            })
        }
    }
    function handleInputChange(event) {
        setNewBook({ ...newBook, [event.target.name]: event.target.value })
        checkForErrors(event)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setBooks([...books, newBook ])
        setNewBook({ title: '', author: '' })
    }

    return (
        <div className="bookshelfDiv">
            <div className="formDiv">
                <h3>Add a Book</h3>
                {
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title: </label>
                        <input id='title'
                            name='title'
                            value={newBook.title}
                            onChange={handleInputChange} />
                        {errors.title && <small>{errors.title}</small>}

                        <label htmlFor='author'>Author: </label>
                        <input id='author'
                            name='author'
                            value={newBook.author}
                            onChange={handleInputChange} />
                        {errors.author && <small>{errors.author}</small>}

                        <button type='submit' disabled={formIsInvalid || formHasMissingData}>Add</button>
                    </form>
                }
            </div>
            <div className="bookCardsDiv">
                {books.map(oneBook =>
                    <div className='bookCard'>
                        <h4>Title: {oneBook.title}</h4>
                        <small>Author: {oneBook.author}</small>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Bookshelf