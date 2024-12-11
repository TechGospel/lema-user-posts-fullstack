export const selectUsersTemplate = `
SELECT 
    users.id AS id,
    users.name AS name,
    users.username AS username,
    users.email AS email,
    users.phone AS phone,
    addresses.street AS street,
    addresses.state AS state,
    addresses.city AS city,
    addresses.zipcode AS zipcode
FROM users
INNER JOIN addresses ON users.id = addresses.user_id
ORDER BY users.name
LIMIT ?, ?
`;


export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
