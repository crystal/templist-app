import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import selectMenuItem from '../../actions/selectMenuItem';

import Banner from '../../components/banner/Banner';
import FeaturedTile from '../../components/featured-title/FeaturedTile';
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
          key: 'road-trip',
          title: 'Road Trip',
          description: 'The Ultimate Road Trip List',
          items: [
            'Change Oil',
            'Check Tire Pressure',
            'Check Battery'
          ]
        },
        {
          key: 'pet-care',
          title: 'Pet Care',
          description: 'The Pet Care List',
          items: [
            'Walk Dogs',
            'Brush Teeth',
            'Medication'
          ]
        },
        {
          key: 'weekend-checklist',
          title: 'Weekend Checklist',
          description: 'The Weekend Warrior\'s Checklist',
          items: [
            'Clean House',
            'Laundry',
            'Grocery Shopping'
          ]
        }
      ]
    };
  }
  componentWillMount() {
    this.props.selectMenuItem('home');
  }
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.featured}>
          <section>
            <Link to="templates/flight-trip">
              <h1>To-Do List Templates</h1>
              <h2>for <span className={styles.trello}>Trello</span></h2>
            </Link>
          </section>
        </div>
        <Banner
          bgColor="#e8f7fa"
          fgColor="#5aa0c4"
          side="left"
          title="Stop Tossing Your To-Do Lists!"
          message="We write, discard and rewrite to-do lists for the recurring events in life (air travel, road trips, hosting houseguests, etc). Even with so much list-making experience, our to-do lists never ever get any better. We're tossing our to-do lists aside instead of refining and reusing them - which leads to forgotten tasks and ineffective lists."
          buttonText="Learn More"
          buttonUrl="about"
          graphic="todo"
        />
        <Banner
          bgColor="#fb8a20"
          fgColor="#fffef9"
          side="right"
          title="How It Works"
          message="With TempLists, simply select a to-do list template you need. Then, you can edit it to make it your own (add, delete or edit the tasks) - and save your version for future use. Your lists are sure to get better each time, and so will all your adventures."
          buttonText="Get Started"
          buttonUrl="browse"
          graphic="how"
        />
        <Banner
          bgColor="#e8f7fa"
          fgColor="#5aa0c4"
          side="left"
          title="Export to Trello"
          message="Export your lists to Trello in one click!"
          buttonText="Get Started"
          buttonUrl="about"
          graphic="taco"
        />
        <Banner
          bgColor="#fb8a20"
          fgColor="#fffef9"
          side="right"
          title="The Perfect Template for Any Occassion"
          message="Find to-do list templates for everything from 'Taking a Roap Trip' to 'Hosting House Guests' or create your own templates for future use."
          buttonText="Browse Templates"
          buttonUrl="browse"
          graphic="templates"
        />
        {/* <div className={styles.top}>
          <section>
            <h2>Featured Templates</h2>
            <Tiles>
              {this.state.tiles.map((tile) => {
                return (
                  <FeaturedTile
                    id={tile.key}
                    key={tile.key}
                    isFavorite={this.props.favorites.includes(tile.key)}
                    title={tile.title}
                    description={tile.description}
                    url={`templates/${tile.key}`}
                    items={tile.items}
                    graphic="pet"
                  />
                );
              })}
            </Tiles>
          </section>
        </div> */}
        <div className={styles.top}>
          <section>
            <h2>Popular Templates</h2>
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
                    maxItems={3}
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
  favorites: [],
  selectMenuItem: () => {}
};

HomePage.propTypes = {
  favorites: PropTypes.array,
  selectMenuItem: PropTypes.func
};

function mapStateToProps(state) {
  return {
    favorites: state.user.favorites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectMenuItem: (selected) => {
      dispatch(selectMenuItem(selected));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
