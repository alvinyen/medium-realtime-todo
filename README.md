# medium-realtime-todo

## 『 0. 專案說明 』
- refer： [Using socket.io in React-Redux app to handle real-time data.](https://medium.com/@gethylgeorge/using-socket-io-in-react-redux-app-to-handle-real-time-data-c0e734297795)

<hr>
<hr>

## 『 1. 環境建置 / webpack /isomorphic setting 』
- 詳可參閱[youtube-presentation-redux-socketio-practice](https://github.com/alvinyen/youtube-presentation-redux-socketio-practice)，內有完整筆記。

<hr>
<hr>

## 『 2.  』
client
    修改text decoration的方式
    get the id from Material-UI ListItem
    bind的使用 (bind this和不bind this的差別)
        ![](https://i.imgur.com/VHUUuiZ.png)
server
    encoded json

immutable
    List 相當於 Array

物件的取代比array方便，因為不用煩惱index
    ```
        {
            ...state,
            欲取代的物件欄位: newValue,
        }
    ```