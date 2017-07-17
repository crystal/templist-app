import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import Tile from '../../components/tile/Tile';
import Tiles from '../../components/tiles/Tiles';

import styles from './Home.sass';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [
        {
          key: 'flight-trip',
          title: 'Flight Trip',
          description: 'The Air Travel Checklist',
          items: [
            'Pack Clothing Bag',
            'Pack Electronics',
            'Online Early Check-in'
          ]
        },
        {
          key: 'house-guest',
          title: 'House Guest',
          description: 'The Ultimate House Guest List',
          items: [
            'Prepare Guest Room',
            'Prepare Guest Bathroom',
            'Prepare Guest Closet'
          ]
        },
        {
          key: 'house-maintenance',
          title: 'House Maintenance',
          description: 'The Ultimate House Maintenance List',
          items: [
            'Change Air Filters',
            'Sweep Floors',
            'Mop Floors'
          ]
        },
        {
          key: 'flight-trip1',
          title: 'Flight Trip',
          description: 'The Air Travel Checklist',
          items: [
            'Pack Clothing Bag',
            'Pack Electronics',
            'Online Early Check-in'
          ]
        },
        {
          key: 'house-guest2',
          title: 'House Guest',
          description: 'The Ultimate House Guest List',
          items: [
            'Prepare Guest Room',
            'Prepare Guest Bathroom',
            'Prepare Guest Closet'
          ]
        },
        {
          key: 'house-maintenance3',
          title: 'House Maintenance',
          description: 'The Ultimate House Maintenance List',
          items: [
            'Change Air Filters',
            'Sweep Floors',
            'Mop Floors'
          ]
        }
      ]
    };
  }
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.featured}>
          <section>
            <Link to="templates/flight-trip">
              <h2>Flight Trip</h2>
              <p>The air travel checklist.</p>
            </Link>
          </section>
        </div>
        <div className={styles.top}>
          <section>
            <h2>Top Templates</h2>
            <Tiles>
              {this.state.tiles.map((tile) => {
                return (
                  <Tile
                    id={tile.key}
                    key={tile.key}
                    isFavorite={this.props.favorites.includes(tile.key)}
                    title={tile.title}
                    description={tile.description}
                    url={`templates/${tile.key}`}
                    items={tile.items}
                  />
                );
              })}
            </Tiles>
          </section>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  favorites: []
};

HomePage.propTypes = {
  favorites: PropTypes.array
};

function mapStateToProps(state) {
  return {
    favorites: state.user.favorites
  };
}

export default connect(mapStateToProps)(HomePage);
