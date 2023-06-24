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
    
    
  return (
          <div className="row">
          <div className="col">
          <h2> Artists </h2>
          <ol>
                          {artists.map(((artist, idx)=><li 
                                                          key={`artist${artist.id}`}
                                                          className={selectedArtistId === artist.id.toString() ? 'selected' : ''}
                                                          >
                                        <a 
                                        href={`http://127.0.0.1:8000/api/v1/artist/${artist.id}`}
                                        onClick={onClickHandlerTracks}
                                        artist_id={artist.id}

                                        >{artist.name}
                                        </a>
                                        </li>))}
          </ol>
          </div>
          <div className="col">
          <h2> Tracks </h2>
          <ul>
                    {tracks.map(((track, idx) => 
                                           <li key={`track${track.id}`}
                                           className={selectedTrack === track.id.toString() ? 'Track_sel' : ''}
                                           >

                        <a
                            href={`http://127.0.0.1:8000/api/v1/song/${track.id}`}
                            onClick={onClickHandlerLyrics}
                            track_id={track.id}
                        >{track.name}
                        </a>
                    </li>))}
                </ul>
          </div>
          <div className="col">
          <h2> Lyrics </h2>
          {lyrics.map(((lyric, idx) => 
                <div key={idx} >
                    <div><b><u>{lyric.name}</u></b></div><br></br>    
                    <em><div style={{ whiteSpace: 'pre-wrap' }}>{lyric.lyrics}</div></em>  
                </div>))}

          </div>
          </div>
  );
}

export default App;
