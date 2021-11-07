import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Input, Divider, Dropdown } from 'antd';
import './css/SearchingInput.scss'

const Searchinginput = (props) => {
    const theInput = useRef()
    const [hotSearch, setHotSearch] = useState([])
    const [searchHistory, setHistory] = useState([])
    function getHotSearch() {
        if (hotSearch.length !== 0) return;
        axios.get('/search/hot')
            .then(res => {
                let hotList = res.data.result.hots
                hotList.forEach(obj => {
                    setHotSearch(hotSearch => [...hotSearch, obj.first])
                })
            })
    }
    function handleDropdown() {
        getHotSearch()
        getSearchHistory()
    }
    function handleConfirm(e) {
        if (e.keyCode !== 13) return;
        let inputValue = e.target.value
        if (inputValue === '') return;
        props.history.push({
            pathname: '/main/search',
            state: inputValue
        })
        setSearchHistory(inputValue)
    }
    function getSelectedTag(index, selectedTag) {
        props.history.push({
            pathname: '/main/search',
            state: selectedTag
        })
        setSearchHistory(selectedTag)
    }

    function setSearchHistory(value) {
        let searchHisList = JSON.parse(localStorage.getItem("searchHistory"))
        if (searchHisList) {
            let found = searchHisList.find(str => str === value)
            if (found) return;
            searchHisList.push(value)
            localStorage.setItem("searchHistory", JSON.stringify(searchHisList))
        } else {
            let list = []
            list.push(value);
            localStorage.setItem("searchHistory", JSON.stringify(list))
        }
    }
    function getSearchHistory() {
        let list = JSON.parse(localStorage.getItem("searchHistory"))
        if (list) {
            setHistory(list)
        }
    }

    const searchingList = (
        <div className="searchingList">
            <div>热门搜索</div>
            <Divider></Divider>
            <div className="searchingTags">
                {
                    hotSearch.map((str, index) => {
                        return (
                            <div
                                className="theTag"
                                key={index}
                                onClick={((e) => { return () => { getSelectedTag(e, str) } })(index)}
                            >{str}</div>
                        )
                    })
                }
            </div>
            <br />
            <div className="searchingHistoryTitle">搜索历史</div>
            <Divider></Divider>
            <div className="searchingTags">
                {
                    searchHistory.map((str, index) => {
                        return (
                            <div
                                className="theTag"
                                key={index}
                                onClick={((e) => { return () => { getSelectedTag(e, str) } })(index)}
                            >{str}</div>
                        )
                    })
                }
            </div>
        </div>
    )
    return (
        <div className="searchinput">
            <Dropdown overlay={searchingList} trigger={['click']} className="searchDropdown">
                <div className="searchinputmain">
                    <Input
                        placeholder="搜索你想听的"
                        size="middle"
                        className="searchinginput"
                        onPressEnter={handleConfirm}
                        onFocus={handleDropdown}
                        ref={theInput}
                    />
                </div>
            </Dropdown>
        </div>

    );
}

export default withRouter(Searchinginput);
