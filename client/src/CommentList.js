import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

export const CommentList = props => {
	const commentNodes = props.data.map(comment => (
		<Comment author={comment.author} key={comment._id} id={comment._id}>
			{comment.text}
		</Comment>
	));
	return <div>{CommentNodes}</div>;
};

CommentList.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			author: PropTypes.string,
			id: PropTypes.string,
			text: PropTypes.string
		})
	)
};

CommentList.defaultProps = {
	data: []
};
