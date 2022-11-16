import Comment from "./Comment"
import axios from "axios"
import { useState } from "react"

const Post = (props) => {
    const postComments = props.postComments

    // Create new comment
    const [newComment, setNewComment] = useState({ comment: '' })

    const handleChange = (event) => {
        setNewComment({ ...newComment, [event.target.name]: event.target.value })
    }

    const createComment = async (e) => {
        e.preventDefault()
        const createdComment = {
            comment: newComment.comment,
            userId: props.user.id,
            postId: postComments.id
        }
        console.log(createdComment)
        await axios.post(`${props.BASE_URL}/comment/create`, createdComment)

        setNewComment({ comment: '' })
    }
    
    const handleSubmit = async (e) => {
        await createComment(e)
        window.location.reload(false)
    }

    // Edit post
    const handleEdit = () => {
        
    }

    // Delete post
    const handleDelete = async (e) => {
        e.preventDefault()
        await axios.delete(`${props.BASE_URL}/post/${postComments.id}`)
        window.location.reload(false)
    }

    let titleBar

    if (props.user) {
        titleBar = (
            <>
            <div className="post-title-bar">
                <div><button className="delete-button" onClick={handleDelete}>X</button></div>
                <div><button className="edit-button" onClick={handleEdit}>✎</button></div>
                <div className="post-title">{postComments.title}</div>
            </div>
            </>
        )
    }

    let publicTitleBar = (
        <div className="post-title-bar">
            <div className="post-title">{postComments.title}</div>
        </div>
    )

    return(
        <div className="post">
            {props.user.id === props.postUserId ? titleBar : publicTitleBar}
            <div className="post-body">{postComments.body}</div>
            <div><img className="post-image" src={postComments.image} alt={postComments.title} ></img></div>
            <div className="comments-title">Comments</div>
            {postComments.associated_comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
            <div className="comment-form">
            <form onSubmit={handleSubmit}>
                <textarea required type='text' placeholder="Add Comment" value={newComment.comment} onChange={handleChange} name={'comment'}></textarea><br></br>
                <button className="post-comment-button">Post</button>
            </form>
            </div>
        </div>
    )
}

export default Post