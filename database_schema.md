# Pinterest Database Schema

## Tables
- users
- profiles
- boards
- pins
- pin comments
- follows

## Relationships
- ONE User MANY Boards
- ONE Board MANY Pins
- ONE Pin MANY Pin Comments

## `users`
| **Column Name** | **Data Type** | **Details** |
| --- | --- | --- |
| *id* | Integer | Primary Key, Not Null 
| *first_name* | String(50) | Not Null |
| *last_name* | String(50) | Not Null |
| *username* | String(50) | Not Null |
| *email* | String(255) | Not Null |
| *hashed_password* | String(50) | Not Null |
| *about* | String(255) | |
| *created_at* | Date | Current Timestamp |
| *updated_at* | Date | Current Timestamp |

## `boards`
| **Column Name** | **Data Type** | **Details** |
| --- | --- | --- |
| *id* | Integer | Primary Key, Not Null |
| *user_id* | Integer | Foreign Key References `users.id` |
| *name* | String(75) | Not Null |
| *description* | String(255) | Not Null |
| *board_cover* | String(255) | Not Null |
| *secret* | Boolean | Default `False` |
| *created_at* | Date | Current Timestamp |
| *updated_at* | Date | Current Timestamp |

## `pins`
| **Column Name** | **Data Type** | **Details** |
| --- | --- | --- |
| *id* | Integer | Primary Key, Not Null |
| *user_id* | Integer | Foreign Key References `users.id` |
| *board_id* | Integer | Foreign Key References `boards.id` |
| *name* | String(50) | Not Null |
| *description* | String(255) | Not Null |
| *category* | String(50) | |
| *url* | String(255) | |
| *created_at* | Date | Current Timestamp |
 *updated_at* | Date | Current Timestamp | 

## `follows`
| **Column Name** | **Data Type** | **Details** |
| --- | --- | --- |
| *id* | Integer | Primary Key, Not Null |
| *user_id* | Integer | Foreign Key References `users.id` |
| *following_id* | Integer | Foreign Key References 'users.id', Not Null |
| *created_at* | Date | Current Timestamp |
| *updated_at* | Date | Current Timestamp |