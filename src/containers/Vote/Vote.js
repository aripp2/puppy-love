import React from 'react';
import { connect } from 'react-redux';
import { postVote } from '../../util/apiCalls';
import './Vote.scss';
import PropTypes from 'prop-types';

export const Vote = ({ randomPup, favorites, updateRandom, updateFavs }) => {
  const { url, id } = randomPup
  const ids = favorites.map(fav => fav.image_id)
  const favStatus = ids.includes(id)
  let favId = null;
  if (favStatus) {
    favId = favorites.reduce((acc, fav) => {
      if(fav.image_id === id) {
        acc += fav.id
      }
      return acc
    }, 0)
  }
  const buttonRole = favStatus ? 'Delete Favorite' : 'Add Favorite';
  return (
    <section className='vote-section'>
      <div className='voting-btns'>
        <button
          className='vote-btn'
          onClick={() => {postVote(id, 1); updateRandom()}}
        >LOVE IT!</button>
        <button
          className='vote-btn'
          onClick={() => {postVote(id, 0); updateRandom()}}
        >NOT SO MUCH</button>
      </div>  
      <img className='voteImg' src={url} alt='dog'/>
      <button
        className='fav-btn'
        onClick={() => updateFavs(id, favStatus, favId)}
      >{buttonRole}</button>

    </section>
  )
}

export const mapStateToProps = ({ randomPup, favorites }) => ({
  randomPup,
  favorites
})


export default connect(mapStateToProps)(Vote);

Vote.propTypes = {
  randomPup: PropTypes.object.isRequired,
  favorites: PropTypes.array,
  updateRandom: PropTypes.func.isRequired,
  updateFavs: PropTypes.func.isRequired
}