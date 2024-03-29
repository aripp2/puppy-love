import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBreedImages } from '../../util/apiCalls';
import { throwError, updateLoading } from '../../actions';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import './SearchForm.scss';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedBreed: '',
      breedImages: []
    }
  }

  changeHandler = (e) => {
    const { breeds } = this.props
    const selected = breeds.find(breed => breed.name === e.target.value)
    this.setState({ selectedBreed: selected })
    this.getSelectedImages(selected.id)
  }

  getSelectedImages = async(id) => {
    const { throwError, updateLoading } = this.props;
    updateLoading(true);
    try {
      const breedImages = await getBreedImages(id)
      this.setState({ breedImages })
      updateLoading(false)
    } catch ({ message }){
      updateLoading(false)
      throwError(message)
    }
  }

  render() {
    const { selectedBreed, breedImages } = this.state;
    const { errorMsg, isLoading } = this.props;
    const { breeds } = this.props
    const breedList = breeds.map(breed => {
      return <option 
        key={breed.id} 
        value={breed.name}
        >{breed.name}</option>
    })

    return (
      <div className='SearchContainer'>
        <aside>
          <form>
            <h3>Choose a Breed:</h3>
            <select
              value={selectedBreed}
              onChange={this.changeHandler}
            >
              { breedList }
            </select>
          </form>
          {selectedBreed && 
            <article>
              <h4>{selectedBreed.name}</h4>
              <p><span>Breed Group: </span>{selectedBreed.breed_group}</p>
              <p><span>Bred For: </span>{selectedBreed.bred_for}</p>
              <p><span>Average Height: </span>{selectedBreed.height.imperial} in</p>
              <p><span>Average Weight: </span>{selectedBreed.weight.imperial} lbs</p>
              <p><span>Average Life Span: </span>{selectedBreed.life_span}</p>
              <h5>{selectedBreed.temperament}</h5>
          </article>}
        </aside>
        {errorMsg && <h2>{errorMsg}</h2>}
        {isLoading && <img src='https://cdn.dribbble.com/users/5976/screenshots/3930514/happy_dog_puppy_tongue_logo_design_symbol_by_alex_tass.gif' alt='loading gif'/>}
        <SearchContainer breedImages={breedImages}/>
      </div>
    )
  }
}

export const mapStateToProps = ({ breeds, errorMsg, isLoading }) => ({
  breeds,
  errorMsg,
  isLoading
});

export const mapDispatchToProps = dispatch => ({
  throwError: error => dispatch(throwError(error)),
  updateLoading: bool => dispatch(updateLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);