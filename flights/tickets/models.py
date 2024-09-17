from django.db import models


class Airport(models.Model):
    name = models.CharField(max_length=3)
    city = models.CharField(max_length=25)

    def __str__(self):
        return f'{self.name} ({self.city})'


class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Flight(models.Model):
    origin_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='departure_flights')
    destination_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='arrival_flights')
    passengers = models.ManyToManyField(Person, related_name='flights')

    def __str__(self):
        return f'{self.origin_airport} - {self.destination_airport}: {self.passengers.all()}'


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=50)


