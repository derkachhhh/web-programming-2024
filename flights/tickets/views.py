from django.shortcuts import render

from tickets.models import Flight


def get_flights(request):
    flights = Flight.objects.all()
    return render(request, 'tickets/flights.html', {'flights': flights})


# def login(request):
#     username = request.POST.get("username", "")
#     password = request.POST.get("password", "")
#     # query = f"""
#     #     SELECT * FROM users
#     #     WHERE username = '{username}' AND password = '{password}';
#     # """
#     # connection.execute(query)
#
#     query = f"""
#             SELECT * FROM users
#             WHERE username = %(username)s AND password = %(password)s;
#         """
#     connection.execute(query, {'username': username, 'password': password})
