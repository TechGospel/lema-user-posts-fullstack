export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
ORDER BY created_at DESC
`;

export const createPostTemplate = `
INSERT INTO posts (id, user_id, title, body,  created_at)
VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);
`;


export const deletePostTemplate = `
DELETE FROM posts
WHERE id = ?
`;