# Interview Scheduling Portal

Created a simple full stack app where admins can create interviews by selecting participants, interview start time and end time

## Basic Requirements

1. An interview creation page where the admin can create an interview by selecting participants, start time and end time. Backend should throw error with proper error message if:

   1. Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
   2. No of participants is less than 2

2. An interviews list page where admin can see all the upcoming interviews.

3. An interview edit page where admin can edit the created interview with the same validations as on the creation page.
