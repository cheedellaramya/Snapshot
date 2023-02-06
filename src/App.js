import { useState,useEffect } from 'react';

import './App.css';

function App() {
  const [data,setData]=useState([]);
  const [category,setCategory] = useState();
  const [searchString,setSearchString]=useState();

  useEffect(()=>{
    searchImages('mountains')
  },[])

  const searchImages =async(str)=>{ 
    const result = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${str}&per_page=24&format=json&nojsoncallback=1`)
    const data = await result.json();
    setData( data.photos.photo);
    setCategory(str);
    
  }
    
  const searchInput=(e)=>{
    const searchString = e.target.value;
    setSearchString(e.target.value)
  }
  
  return (
    <div className='container' style={{textAlign:'center'}}>
      <div>
        <h1 className='title'>SnapShot</h1>
          <div className='input-group mb-3' style={{'paddingLeft':'40%'}}>
            <input  className='input' type='text' name='search' placeholder='Search...' onChange={searchInput} autoComplete="no"/>
            <span>
              <button type='button' className='btn btn-primary' style={{width:"20",height:"20"}} 
                onClick={() => searchImages(searchString)}> <i className='fas fa-search'/></button>
            </span>
          </div>
        <div className='block'>
            <button  className='buttons'  onClick={()=>searchImages('Mountains')}>Mountains</button>
            <button  className='buttons' onClick={()=>searchImages('Beaches')} >Beaches</button>
            <button  className='buttons' onClick={()=>searchImages('Birds')}>Birds</button>
            <button  className='buttons' onClick={()=>searchImages('Food')} >Food</button>
        </div>
        <div>
          <h2 className='image'>  {`${category} images`}</h2>

          <div className="row">
            {data && data.map((item,i)=>{
              return (
              
                <div className="card col-md-3 mb-3" key={i}>
                  <img style={{'width':'300px','height':'200px'}}src= {`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt="test"/>
                </div>
              
              )
            })}
          </div> 
        </div>
        
      </div>
  </div>
  );
}

export default App;
