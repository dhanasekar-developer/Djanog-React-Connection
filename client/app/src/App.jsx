import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [books, setBooks] = useState([]);
	const [title, setTitle] = useState('');
	const [releaseYear, setReleaseYear] = useState(0);
	const [updateTitle, setUpdateTitle] = useState('');
	const [updateReleaseYear, setUpdateReleaseYear] = useState(0);

	useEffect(() =>{
		fetchBooks()
	},[])

	const fetchBooks = async () =>{
		try{
			const response = await fetch("http://localhost:8002/api/books/")
			const data = await response.json()
			setBooks(data)
		}catch(err){
			console.log(err)
		}
	}
	
	const popup = document.getElementById('popup');
	const edit=(id)=>{
		popup.style.display = "block";
		const editBtn = document.getElementById('editBtn');
		editBtn.setAttribute("value",id)
		return id = id;
	}
	const closePopup=()=>{
		popup.style.display = "none";

	}

	const addBook = async() => {
		const bookData = {
			title: title,
			release_year: releaseYear
		}
		const response = await fetch("http://localhost:8002/api/books/create/",{
			method: "POST",
			headers:{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bookData)
		});
		const data = await response.json();
		setBooks((prev) => [...prev,data])
	}

	const updateBook = async(id) =>{
		try{
			const bookData = {
				title: updateTitle,
				release_year: updateReleaseYear,
			}
			const response = await fetch(`http://localhost:8002/api/books/${id}`,{
				method: "PUT",
				headers:{
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bookData)
			});
			const data = await response.json();
			setBooks((prev) => prev.map((book)=>{
				if(book.id == id){
					return data;
				}
				else{
					return book;
				}
			}))
		}catch(err){
			console.log(err)
		}
		
	}

	const deleteBook = async(pk) =>{
		try{
			const response = await fetch(`http://localhost:8002/api/books/${pk}`,{
				method: "DELETE"
			});
			setBooks((prev)=> prev.filter((book)=> book.id != pk))
		}catch(err){
			console.log(err)
		}
		
	}
  	return (
		<div className='bodyDiv'>
			<h1 className='mb-5'>Books Library</h1>
			<table>
				<tbody>
					<tr>
						<td><label>Title :</label></td>
						<td><input type="text" className='form-control' placeholder='Enter Book Tile' onChange={(e)=>setTitle(e.target.value)} /></td>
					</tr>
					<tr>
						<td><label>Year of Release: </label></td>
						<td><input type="number" className='form-control yearInput' placeholder='Enter Year of Release' onChange={(e)=>setReleaseYear(e.target.value)} /></td>
					</tr>
					<tr>
						<td colSpan={2}><button className='btn btn-primary addBtn' onClick={addBook}>Add Book</button></td>
					</tr>
				</tbody>
			</table>
			
		
			<div className='mt-5 bookDetails'>
				{books.map((book)=><div key={book.id}>
					<label className='me-3'>Title : {book.title};</label>
					<label className='me-3'>Released Year : {book.release_year}</label>
					<i className="fa fa-edit icon" onClick={()=>edit(book.id)}></i>
					<i className="fa fa-trash-o icon" onClick={()=>deleteBook(book.id)}></i>
				</div>
				)}
				
			</div>
			<div className='popup' id="popup">
				<div className='popupBackground' onClick={()=>closePopup()}></div>
				<div className='popupForm'>
					<label className='closePopup' onClick={()=>closePopup()}>X</label>
					<table>
						<tbody>
							<tr>
								<td><label>Title :</label></td>
								<td><input type="text" className='form-control' placeholder='Enter Book Tile' onChange={(e)=>setUpdateTitle(e.target.value)}/></td>
							</tr>
							<tr>
								<td><label>Year of Release: </label></td>
								<td><input type="number" className='form-control' placeholder='Enter Year of Release' onChange={(e)=>setUpdateReleaseYear(e.target.value)}/></td>
							</tr>
							<tr>
								<td colSpan={2}><button className='btn btn-primary addBtn' id="editBtn" 
								onClick={
									(e)=>{
										updateBook(e.target.value);
										closePopup();
									}
									}>Edit Book</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
  	)
}

export default App
