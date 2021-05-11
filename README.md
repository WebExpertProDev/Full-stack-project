# Housee Backend Service

# User Types: 
- Admin
- Landlord
- Tenant
- Agent

# Apps
- HouseeApp: Base Authentication Module and the parent for all user types defined in our system
- LandlordApp: Any functionalities attributed to a Landlord User
- TenantApp: Any functionalities attributed to a Tenant User 
- AgentApp: Any functionalities attributed to an Agent User
- PublicApp: Any models that are gonna be publicly available to users
- CloudApp: Anything belongs to cloud services we use
- OffersApp: Sale, Presale, and Rent
- PaymentsApp: Anything money related(Invoices, Subscriptions, etc)
- NotificationsApp: Sms/Email/PushNotification Clients
- LoggerApp: Used to log any exceptions occurred across the backend project


to run the project, 
``$  /bin/sh ./bin/dev_start.sh ``
### Deployment
How to deploy code changes?
``$ /bin/sh ./bin/deploy.sh``

Running for the first time?

$ python3 manage.py initdb

$ python3 manage.py collectstatic
