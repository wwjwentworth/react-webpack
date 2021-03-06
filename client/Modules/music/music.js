import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as headerActions from '../../components/header/header.action'
import cookie from 'react-cookies'
import MusicList from './musiclist/musiclist'
import Player from '../player/player'
import Header  from '../../components/header/header'
import  './music.less'
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane;
class Music extends Component {
    
    componentDidMount() {
        const {dispatch} = this.props
        // dispatch(headerActions.refresh())
        if(cookie.load("user")) {
            dispatch(headerActions.setUser())
        }
    }
    
    render() {
        const {isLoading} = this.props.music
        return (
            <div className="wwj-music">
                <Header></Header>
                {
                    !isLoading ? 
                    <Tabs defaultActiveKey="musicList" className="tabs">
                        <TabPane tab="个性推荐" key="recommend">个性推荐</TabPane>
                        <TabPane tab="歌单" key="musicList">
                            <MusicList></MusicList>
                        </TabPane>
                    </Tabs>:null
                }
                {
                    isLoading ? 
                    <div className="loading">
                        <div></div>
                        <p>loading</p>
                    </div> : null
                }
                <Player></Player>
            </div>
        )
    }
}

function mapStateToProps({ header, music }) {
    return {
        header,
        music
    }
}
export default connect(mapStateToProps)(Music)