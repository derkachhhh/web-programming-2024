from django.contrib import admin
from tickets.models import Airport, Person, Flight


class AirportAdmin(admin.ModelAdmin):
    list_display = ["name", "city"]


admin.site.register(Airport)
admin.site.register(Person)
admin.site.register(Flight)

