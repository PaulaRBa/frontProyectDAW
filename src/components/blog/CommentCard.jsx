import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CommentCard({ comment, credentials }) {

    return (
        <Card className="commentCard">
            <Card.Body className="commentCard">
                <Card.Subtitle className="commentCard row mb-2 text-muted">
                    {/* <div className="col-6"> <h6 className="changeText"><Image src={`data:image/jpeg;base64,${credentials.profilePicture}`} height="20px" width="25px" />  {comment.userAlias}</h6></div> */}
                    <div className="col-6"> <h6 className="changeText">{comment.userAlias}</h6></div>
                    <div className="right col-6"><p className="changeText">{comment.createDate}</p></div>
                </Card.Subtitle>
                <Card.Text className="commentCardText">{comment.content}</Card.Text><br />

                {credentials.isLogged
                    ? <Link className="commentsLink card-link" to={`/report/${comment.id}`} >Denunciar</Link>
                    : null
                }
            </Card.Body>
        </Card>
    );
}

export default CommentCard;

