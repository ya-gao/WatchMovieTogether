from .models import Event, GroupExtend, Vote
from rest_framework import viewsets, permissions
from .serializers import ShowGroupSerializer, GroupSerializer, EventSerializer, VoteSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from movies.models import Movie
from django.core.mail import send_mail

class VoteViewSet(viewsets.ModelViewSet):
    serializer_class= VoteSerializer

    def create(self, request):
        print("creating Votes")
        current_movie= Movie.objects.get(movie_id=request.data['movie_id_pass'])
        current_user = request.user
       
        event = Event.objects.get(id=request.data['event_id_pass'])
        vote_quertset = event.votes.filter(user=current_user)

        if not vote_quertset:

            vote = Vote.objects.create(
                user = current_user,
                movie = current_movie
            )
            vote.save()
            event.votes.add(vote)
        else:
            vote = event.votes.get(user=current_user)
            vote.movie = current_movie
            vote.save()
        event.save()
        event_serializer = EventSerializer(event)
        return Response(event_serializer.data)


class GroupInViewSet(viewsets.ModelViewSet):
    serializer_class = ShowGroupSerializer

    def get_queryset(self):
        # print("I'm getting something")
        # print(GroupExtend.objects.filter(members__in=[self.request.user]))
        return GroupExtend.objects.filter(members__in=[self.request.user])


# Event Viewset
class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects

    # to do time have some format problem
    def create(self, request):
        event_info = request.data['event_pass']
        current_group = GroupExtend.objects.get(id=event_info['group'])
        current_event_start_vote_time = event_info['event_start_vote_time']
        current_event_end_vote_time = event_info['event_end_vote_time']
        current_event_time = event_info['event_time']
        event = Event.objects.create(
            group=current_group,
            event_name=event_info['event_name'],
            event_location=event_info['event_location'],
            event_start_vote_time=current_event_start_vote_time,
            event_end_vote_time=current_event_end_vote_time,
            event_time=current_event_time,
        )
        
        event.save()
        
        # print(event)

        movie_info = request.data['movie_list_pass']
        for movie in movie_info:
            # print(movie)
            current_movie_id = movie['movie_id']
            current_movie_title = movie['movie_title']
            current_movie_simple_describe = movie['movie_overview']
            # this is not the actual movie link now!!!
            current_movie_link = movie['movie_youtubeLink']
            current_movie_review_link = movie['movie_youtubeLink']
            current_movie_published = movie['movie_year']
            movie_queryset = Movie.objects.filter(movie_id=current_movie_id)
            
            if not movie_queryset:
                # print(f"dont have any thing {movie_queryset}")
                movie_obj = Movie.objects.create(
                    movie_id=current_movie_id,
                    movie_title=current_movie_title,
                    movie_simple_describe=current_movie_simple_describe,
                    movie_link=current_movie_link,
                    movie_review_link=current_movie_review_link,
                    movie_published=current_movie_published,
                )
                movie_obj.save()
                event.movies.add(movie_obj)
            else:
                movie_obj = Movie.objects.get(movie_id=current_movie_id)
                event.movies.add(movie_obj)

        # print(request.data['event_pass'])
        # print(request.data['movie_list_pass'])
        event.save()
        email_list = []
        for member in current_group.members.all():
            email_list.append(member.email)
        send_mail(
            "A new event",
            f"your group {current_group.group_name} created a new event {event.event_name}",
            from_email="adamgu2016@gmail.com",
            recipient_list=email_list,
            fail_silently=True,
        )
        event_serializer = EventSerializer(event)

        return Response(event_serializer.data)

    
class GorupUnsubscribeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer


    def destroy(self, request, pk=None):
        # print("perform update")
        # print(request.data)
        group = GroupExtend.objects.get(id=pk)

        # current_user = User.objects.get(username=request.user)
        current_user = self.request.user
        group.members.remove(current_user)
        # print(current_user.username)
        group.save()
        # group = GroupExtend.objects.get(id=self.action.id)
        # print(group)
        # new_user = User.objects.get(username=request.user.username) 
        # group.members.remove(new_user)
        # group.save()
        return Response()


class GroupManageViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        group = self.request.user.group_owned.all()
        return group


# Group Viewset
class GroupViewSet(viewsets.ModelViewSet):
    #queryset = NewGroupManager.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ShowGroupSerializer

    # overwrite getQueryset method because we only want return the groups of the authenticated user
    def get_queryset(self):
        # return [[0],[1]]
        groups = self.request.user.group_owned.all()
        # for group in groups:
        #     group.owner = group.owner.username
        #     newMember = []
        #     for member in group.members:
        #         newMember.append(member.username)
        #     print(newMember)
        #     print(group.owner)
        return groups
    

