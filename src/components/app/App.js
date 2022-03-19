import './App.css'
import React from 'react'
import { SearchBar } from '../searchbar/searchbar'
import { PlayList } from '../playlist/playlist'
import { SearchResults } from '../searchresults/searchresults'

class App extends React.Component {
  constructor(props) {
    super(props)
   
    this.state = {
      searchResults: [
        {
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          id: 1
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: 2
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 3
        }
      ],
      playlistName: 'My playlist',
      playlistTracks: [
        {
          name: 'playlist one',
          artist: 'playlist artist one',
          album: 'playlist album one',
          id: 4,
        },
        {
          name: 'playlist two',
          artist: 'playlist artist two',
          album: 'playlist album two',
          id: 5,
        }
      ]
    }
  }

  
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}
export default App