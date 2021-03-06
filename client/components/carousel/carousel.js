import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as carouselAction from './carousel.action'
import CarouselItem from './carousel.item'
import CarouselArrows from './carousel.arrows'
import CarouselDots from './carousel.dots'
import './Carousel.less'
class Carousel extends Component{
    
    turn = (now) => {
        const {dispatch, carousel} = this.props
        const nowLocal = carousel.nowLocal
        const items = this.props.items
        now = nowLocal+now;
        if(now < 0) {
            now += items.length
        }
        if(now >= items.length) {
            now -= items.length
        }
        dispatch(carouselAction.changeNowLocal(now))
    }
    render() {
        const {items} = this.props
        const { nowLocal,speed,arrows,dots,pause
        } = this.props.carousel
        const count = items.length;
        let itemNodes = items.map((item, index) => {
            return(
                <CarouselItem item={item}
                    count={count}
                    key={index}>
                </CarouselItem>
            )
        })
        let arrowsNodes = <CarouselArrows turn={this.turn} count={count} nowLocal={nowLocal}/>
        let dotsNodes = <CarouselDots turn={this.turn} count={count} nowLocal={nowLocal}/>
        return(
            <div className="carousel"
                onMouseOver={pause?this.pausePlay.bind(this):null}
                onMouseOut={pause?this.goPlay.bind(this):null}>
                <ul style={{
                    left:-100*nowLocal+'%',
                    transitionDuration:speed+'s',
                    width:items.length*100+'%'
                }}>
                    {itemNodes}
                </ul>
                {arrows?arrowsNodes:null}
                {dots?dotsNodes:null}
            </div>
        )
    }
}
const mapStateToProps = ({carousel}) =>{
    return {
       carousel
    }
}
export default connect(mapStateToProps)(Carousel)