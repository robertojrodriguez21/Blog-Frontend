import Post from './Post'

const Feed = (props) => {
    const postsComments = props.postsComments
    return(
        <div>
            <div>FEED</div>
            {postsComments.map((postComments) => (
                <Post key={postComments.id} postComments={postComments} />
            ))}
        </div>
    )
}

export default Feed