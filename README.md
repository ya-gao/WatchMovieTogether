# WatchMovieTogether
Full stack Django/React/Redux app that uses token based authentication with Knox.<br/>
A demo video and OOD diagrams are in [Google Drive Folder](https://drive.google.com/drive/folders/1Ni1juKaKFiFebxwaioT_gW00UZ_NRP8L?usp=sharing)

## Quick Start
```
# Install dependencies (from root)
npm install

# Serve API on localhost:8000 (from MyProject folder)
python manage.py runserver

# Run webpack (from root)
npm run dev

```

## Requirements
1.	The system shall allow a group moderator to create a movie watcher’s group
2.	The system shall allow the moderator to invite family and friends to join the group
3.	The system shall allow friends and family to join a group of movie watchers
4.	The system shall allow people to unsubscribe from movie watcher’s groups
5.	The system shall allow the moderator to populate movie watcher’s groups with a list of potential movies that could be watched
6.	The system shall allow the moderator to pull a movie list from a movie list server/API
7.	The system shall allow group members to search and browse the movies that have been populated by the moderator.
8.	The system shall allow group member to watch the trailer of the movies that have been populated by the moderator (Obs. Movie trailer do not need to be uploaded by the moderator, however, links to movie trailers must be available along the list of movies that have been populated by the moderator)
9.	The system shall allow group members to have access to movie reviews of the movies that have been populated by the moderator (Obs. Movie reviews do not need to be uploaded by the moderator, however, links to movie reviews must be available along the list of movies that have been populated by the moderator. The system could provide movie reviews from a movie review service)
10.	The system shall allow the moderator to create a movie watching event that will occur in the specified date and time defined by the moderator
11.	The system shall allow the moderator to open and close a voting period for a specific movie watching event
12.	The system shall allow participants of a movie watcher group to be notified that a movie watching event was created and that they can vote for the movies that they want (or do not want) watch in this movie watching event
13.	The system shall allow group participants to cast their votes where they indicate what movies they want and do not want to watch in a specific movie watching event previously created by the moderator
14.	The system shall keep the history of movie watching events, votes, and winners for each movie watching group. This information shall only be available for the participants of the movie watching group. I.e., a group, A, cannot see the movie watching events, votes, and winners of another group, e.g., group B.
15.	The system shall elect a single movie winner for a movie watching event based on the votes casted by the movie watcher group.
16.	The system shall not allow participants of a movie watching group to change their votes AFTER the system computed the winner movie based on casted votes

## Helpful Resources
[Django REST Framework](https://www.django-rest-framework.org/)<br/>
[axios](https://github.com/axios/axios)<br/>
[Django Documentation](https://docs.djangoproject.com/en/3.0/)<br/>
[Youtube Full Stack React & Django](https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60)<br/>
