import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [data,setData]=useState([]);
  const [category,setCategory] = useState();
  const [searchString,setSearchString]=useState();

  useEffect(()=>{
    searchImages('Mountains')
  },[])

  const searchImages =async(str,isCategoryFilter)=>{ 
    if(isCategoryFilter){
      setSearchString('');
  }
    
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${str}&per_page=24&format=json&nojsoncallback=1`)
      .then((res)=>{
        setData( res.data.photos.photo);
        })
  setCategory(str);
  }
  const searchInput=(e)=>{    
  setSearchString(e.target.value);
  }
  return (
    <div className='container' style={{textAlign:'center'}}>
      <div>
        <h1 className='title'>Snapshot</h1>
          <div className='input-group mb-3' style={{'paddingLeft':'37%', 'marginBottom':'30px'}}>
            <input  className='input' type='text' name='search' placeholder='Search...' value={searchString} onChange={searchInput} autoComplete="no"/>
            <span>
              <button type='button' className='btn btn-primary' style={{width:"20",height:"20",padding:'10px'}} 
                onClick={() => searchImages(searchString,false)}> 
                <i className='fas fa-search'/>
              </button>
            </span>
          </div>
        <div className='Category'>
            <button onClick={()=>searchImages('Mountains',true)} className={category === 'Mountains' ? 'buttons active' : 'buttons'}>Mountains</button>
            <button onClick={()=>searchImages('Kids',true)} className={category === 'Kids' ? 'buttons active' : 'buttons'} >Kids</button>
            <button onClick={()=>searchImages('Birds',true)} className={category === 'Birds' ? 'buttons active' : 'buttons'}>Birds</button>
            <button onClick={()=>searchImages('Food',true)} className={category === 'Food' ? 'buttons active' : 'buttons'} >Food</button>
        </div>
        <div>
          <h2 className='image'>  {`${category} images`}</h2>

          <div className="row">
            {data && data.map((item,i)=>{
              return (
              <div className="col-md-3 mb-3" key={i}>
                <div className='card'>
                  <img style={{'width':'270px','height':'200px'}} 
                    src= {`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}  alt="test"/>
                </div>
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
