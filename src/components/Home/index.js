import {Component} from 'react'
import NavBar from '../NavBar'
import CarouselItems from '../CarouselItems'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="home">
          <CarouselItems />
          <PopularRestaurants />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
