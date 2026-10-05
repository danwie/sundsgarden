-- SKILL 2

-- facid is a foreign key that points to facilities table
-- memid is a foreign key that points to members table
-- many to many. cd.bookings is a junction table
-- one to many (several members can be recommended by the same member)

-- SKILL 3

--  How can you produce a list of the start times for bookings by members named 'David Farrell'? 
SELECT cd.bookings.starttime FROM cd.bookings
JOIN cd.members ON cd.bookings.memid = cd.members.memid
WHERE firstname = 'David' AND surname = 'Farrell'

--  How can you produce a list of the start times for bookings for tennis courts, for the date '2012-09-21'?
SELECT cd.bookings.starttime, cd.facilities.name
FROM cd.bookings
JOIN cd.facilities ON cd.bookings.facid = cd.facilities.facid
WHERE cd.facilities.name LIKE 'Tennis%'
AND cd.bookings.starttime >= '2012-09-21'
AND cd.bookings.starttime < '2012-09-22'
ORDER BY cd.bookings.starttime

--  How can you output a list of all members who have recommended another member?
SELECT DISTINCT m1.firstname, m1.surname
FROM cd.members m1
JOIN cd.members m2 ON m1.memid = m2.recommendedby
ORDER BY m1.surname, m1.firstname

--  How can you output a list of all members, including the individual who recommended them (if any)?
SELECT m1.firstname, m1.surname, m2.firstname, m2.surname
FROM cd.members as m1
LEFT JOIN cd.members as m2 ON m1.recommendedby = m2.memid
ORDER BY m1.surname, m1.firstname

--  How can you produce a list of all members who have used a tennis court?
SELECT DISTINCT CONCAT_WS(' ', firstname, surname) as member, cd.facilities.name
FROM cd.members
JOIN cd.bookings ON cd.members.memid = cd.bookings.memid
JOIN cd.facilities ON cd.bookings.facid = cd.facilities.facid
WHERE cd.facilities.name LIKE 'Tennis%'
ORDER BY member

-- Produce a list of costly bookings
-- I got incorrect answer
SELECT CONCAT_WS(' ', firstname, surname) as member,
cd.facilities.name as facility, cd.facilities.membercost*cd.bookings.slots as cost
FROM cd.members
JOIN cd.bookings ON cd.members.memid = cd.bookings.memid
JOIN cd.facilities ON cd.bookings.facid = cd.facilities.facid
WHERE starttime >= '2012-09-14' AND starttime < '2012-09-15'
AND cd.facilities.membercost*cd.bookings.slots > 30
ORDER BY cost DESC

-- Produce a list of all members, along with their recommender, using no joins. 
-- I got incorrect answer
SELECT CONCAT_WS(' ', m1.firstname, m1.surname) as member,
CONCAT_WS(' ', m2.firstname, m2.surname) as recommender
FROM cd.members as m1, cd.members as m2
WHERE m1.recommendedby = m2.memid OR m1.recommendedby IS NULL
ORDER BY member

-- Produce a list of costly bookings, using a subquery 
-- I got incorrect answer

-- Regarding incorrect answers above: I had to look at the solutions.
-- It feels wrong to copy the answers.
-- It seems better to leave it empty here and say that I understand the solutions.