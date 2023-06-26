// import logo from './logo.svg';
import './App.css';


import { useState, useRef, useEffect } from 'react';

import axios, * as others from 'axios';

function App() {
    const [artists, setArtists] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const [tracks,setTracks]=useState([]);
    const [lyrics, setLyrics] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [trackSearchTerm, setTrackSearchTerm] = useState('');


    useEffect(() => {
        axios.get("http://127.0.0.1:8000//api/v1/artist")
            .then((resp) => {
                setArtists(resp.data.artists);
                setTracks([])
                setLyrics([])
            });
        },[]);

        function onClickHandlerTracks(e) {
            e.preventDefault();
            const artistId = e.currentTarget.getAttribute('artist_id');
            setSelectedArtistId(artistId.toString());
            axios.get(`http://127.0.0.1:8000/api/v1/artist/${artistId}`)
                .then((resp) => {
                    setTracks(resp.data.tracks);
                    setLyrics([])
                });
        }

        function onClickHandlerLyrics(e) {
            e.preventDefault()
            const trackId = e.currentTarget.getAttribute('track_id');
            setSelectedTrack(trackId.toString());
            axios.get(`http://127.0.0.1:8000/api/v1/song/${trackId}`)
                .then((resp) => {
                    setLyrics([resp.data])
                })
        }
        const filteredArtists = artists.filter(artist =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredTracks = tracks.filter(track =>
            track.name.toLowerCase().includes(trackSearchTerm.toLowerCase())
        );


         
  return (
          
          
          <div className="row">
          <div className="col-sm-4">
          <div className='artblock' col>
          <h2 className='artcolor'> Artists </h2>
          <input className='search1' type="text" placeholder="Search artists"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
          <ol>
                          {filteredArtists.map(((artist, idx)=><li
                                                          key={`artist${artist.id}`}
                                                          className={selectedArtistId === artist.id.toString() ? 'selected' : ''}
                                                          >
                                        
                                        <a className='highlight'
                                        href={`http://127.0.0.1:8000/api/v1/artist/${artist.id}`}
                                        onClick={onClickHandlerTracks}
                                        artist_id={artist.id}

                                        >{artist.name}
                                        </a>
                                        </li>))}
          </ol>
          </div>
          </div>
          <div className="col-sm-4">
            <div className='trackblock'>
          <h2 className='trackcolor'> Tracks </h2>
          <input className='search2' type="text" placeholder="Search tracks"
                        value={trackSearchTerm}
                        onChange={(event) => setTrackSearchTerm(event.target.value)}
                    />
          <ul>
                    {filteredTracks.map(((track, idx) => 
                                           <li key={`track${track.id}`}
                                           className={selectedTrack === track.id.toString() ? 'Track_sel' : ''}
                                           >

                        <a className='highlight1'
                            href={`http://127.0.0.1:8000/api/v1/song/${track.id}`}
                            onClick={onClickHandlerLyrics}
                            track_id={track.id}
                        >{track.name}
                        </a>
                    </li>))}
                </ul>
          </div>     
          </div>
          <div className="col-sm-4">
        <div className='lyricblock'>
          <h2 className='lyricolor'> Lyrics </h2>
          {lyrics.map(((lyric, idx) => 
                
                <div key={idx} >
                    <div style={{color:'#f2ceaa',fontSize:'25px'}}><b><u>{lyric.name}</u></b></div><br></br>
                    <em><div style={{ whiteSpace: 'pre-wrap',color:'#f2ceaa' }}>{lyric.lyrics}</div></em>
                </div>))}
                
</div>
          </div>
          </div>
          
  );
}

export default App;
