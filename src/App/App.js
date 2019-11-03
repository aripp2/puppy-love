import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRandom, getFavorites, addFavorite } from '../util/apiCalls';
import { setRandom, throwError, updateLoading, setFavs } from '../actions';
import NavHeader from '../NavHeader/NavHeader';
import SearchForm from '../SearchForm/SearchForm';
import SearchContainer from '../SearchContainer/SearchContainer';
import FavoritesContainer from '../FavoritesContainer/FavoritesContainer';
import Vote from '../Vote/Vote';
import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  updateRandom = async() => {
    const { setRandom, throwError, updateLoading } = this.props;
    try {
      const random = await getRandom();
      console.log(random)
      setRandom(random)
      updateLoading(false)
    } catch({ message }) {
      updateLoading(false)
      throwError(message)
    }
  }

  async componentDidMount() {
    const { setFavs, throwError, updateLoading } = this.props
    try {
      await this.updateRandom()
      const favs = await getFavorites()
      console.log('in componentDidMount', favs)
      setFavs(favs)
      updateLoading(false)
    } catch ({ message }) {
      updateLoading(false)
      throwError(message)
    }
  }

  updateFavs = async(id) => {

  }

  render() {
    const { errorMsg, isLoading, randomPup, favorites } = this.props;
    console.log('in app render', favorites)
    return (
      <div className="App">
        <NavHeader />
        <main>
          {errorMsg && <h2>{errorMsg}</h2>}
          {isLoading && <h2>Loading...</h2>}
          {!isLoading && <Route exact path='/' render={() => <Vote updateRandom={this.updateRandom}/>}/>}
          <Route path='/search' render={() => 
            <section>
              <SearchForm /> 
              <SearchContainer /> 
            </section>}/>
          <Route path='/favorites' render={() => 
            <FavoritesContainer />} />

        </main>
      </div>
    );
  }
}

export const mapStateToProps = ({ errorMsg, isLoading, randomPup, favorites }) => ({
  errorMsg,
  isLoading,
  randomPup,
  favorites
})

export const mapDispatchToProps = dispatch => ({
  setRandom: pup => dispatch(setRandom(pup)),
  throwError: error => dispatch(throwError(error)),
  setFavs: favs => dispatch(setFavs(favs)),
  updateLoading: bool => dispatch(updateLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
