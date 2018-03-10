import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { specIndex, formatDuration } from '../../../common/util'
import { Table, Icon } from 'antd'
import {format} from 'date-fns'
import cookie from 'react-cookies'
import * as musicActions from '../music.action'
import * as playerActions from '../../player/player.action'
import * as communityActions from '../../community/community.action'
import './content.less'

const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'
class Content extends Component {
    state = {
        dataSource: [],
        columns : [{
            title: '序列',
            dataIndex: 'sequence',
            key: 'sequence',
            render: (sequence) => {
                return (
                    <div className="sequence">
                        {sequence}
                    </div>
                )
            },
        }, {
            title: '歌曲',
            dataIndex: 'name',
            key: 'name',
            render: (name, song) => {
                return (
                    <div className="name">
                        <Icon type="caret-right" onClick={() => this.playSong(this.props.tracks[song.key])}/>
                        <Icon type="share-alt" onClick={() => this.shareSong(this.props.tracks[song.key])} />
                        {name}
                    </div>
                )
            },
        }, {
            title: '作者',
            dataIndex: 'artist',
            key: 'artist',
            render:(artist) => {
                return(
                    <div className="artist">
                        <Link to={`artist/${artist[0].id}`}>{artist[0].name}</Link>
                    </div>
                )
            }
        }, , {
            title: '专辑',
            dataIndex: 'album',
            key: 'album',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        }]
    }
    componentDidMount() {
        const { tracks } = this.props
        let dataSource = []
        tracks.map((track, index) => {
            dataSource.push({
                key: index,
                sequence: specIndex(index),
                name: track.name,
                album: track.al.name,
                time: formatDuration(track.dt),
                artist:track.ar,
            })
        })
        this.setState({
            dataSource: dataSource
        })
    }
    playSong = (song) => {
        const {dispatch} = this.props
        dispatch(playerActions.playSong(song))
    }
    shareSong = (song) => {
        const {dispatch, history} = this.props
        if(!cookie.load("user")) {
            alert("222")
        }
        console.log(song, new Date())
        const sharedSongInfo = {
            time: format(new Date(), FORMAT_TIME),
            user:cookie.load("user"),
            song:song,
            type:'music',
            fork:0,
            like:0,
            comment:[]
        }
        console.log(song)
        dispatch(musicActions.shareSong(sharedSongInfo))
        history.push('/community')
    }
    render() {
        const { tracks, isShowAr = true } = this.props
        console.log(this.state.dataSource)
        return (
            <div className="music-details-content">
                <p className="play-all-btn">播放全部({tracks.length})</p>
                <ul className="song-container">
                    <Table dataSource={this.state.dataSource} columns={this.state.columns}
                    pagination={false} ></Table>
                </ul>
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
export default withRouter(connect(mapStateToProps)(Content))