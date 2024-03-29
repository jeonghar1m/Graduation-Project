import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");
    
    const { movieId } = props;
    const { isLogin } = props;

    const timestamp = new Date().getTime();

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            movieId: movieId,
            commentId: `${movieId}+${timestamp}`
        }

        axios.post('/api/comment/saveComment', variables)
        .then(res => {
            if(res.data.success) {
                setcommentValue("");
                props.refreshFunction(res.data.result);
            } else {
                alert('코멘트를 저장하지 못했습니다.');
            }
        })
    }
    
    return (
        <div>
            <p><h4>리뷰</h4></p>
            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={movieId} isLogin={isLogin} />
                        <ReplyComment refreshFunction={props.refreshFunction} parantCommentId={comment._id} movieId={movieId} isLogin={isLogin} commentLists={props.commentLists} />
                    </React.Fragment>
                )
            ))}
            {/* Root Comment Form */}
            {isLogin && 
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={handleClick}
                        value={commentValue}
                        placeholder="코멘트를 작성하세요."
                    >
                    <br />
                    </textarea>
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>확인</button>
                </form>
            }
        </div>
    )
}

export default Comment